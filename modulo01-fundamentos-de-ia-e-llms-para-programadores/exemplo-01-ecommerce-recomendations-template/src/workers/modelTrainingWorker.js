import 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.22.0/dist/tf.min.js'
import { workerEvents } from '../events/constants.js'

console.log('Model training worker initialized')
let _globalCtx = {}
let _model = {}
const WEIGHTS = {
    category: 0.4,
    color: 0.3,
    price: 0.2,
    age: 0.1
}
// Normalização de dados (price, age) para o intervalo [0, 1]
// para que o modelo possa aprender de forma mais eficiente
// A normalização é feita usando a fórmula: (value - min) / (max - min)
// Isso ajuda a evitar que características com escalas maiores dominem o 
// processo de treinamento
// exemplo: se a idade dos usuários varia de 18 a 65 anos, e os preços dos 
// produtos variam de $10 a $1000,
// a normalização garantirá que ambos os conjuntos de dados estejam na mesma 
// escala, facilitando o aprendizado do modelo.
const normalize = (value, min, max) => (value - min) / ((max - min) || 1)

function makecontext(users, products) {
    const Ages = users.map(u => u.age)
    const MinAge = Math.min(...Ages)
    const MaxAge = Math.max(...Ages)

    const Prices = products.map(p => p.price)
    const MinPrice = Math.min(...Prices)
    const MaxPrice = Math.max(...Prices)

    const colors = [...new Set(products.map(p => p.color))] 
    const categories = [...new Set(products.map(p => p.category))]

    const colorsindex = Object.fromEntries(
        colors.map((color, index) => {return[color, index]})
    )

    const categoryindex = Object.fromEntries(
        categories.map((category, index) => {return[category, index]})
    )

    // Computar a media de idade dos usuários por produto
    const MidAge =(MinAge + MaxAge)/2
    const AgeSums = {}
    const AgeCounts = {}
    users.forEach(user => {
        user.purchases.forEach(p => {
            AgeSums[p.name] = (AgeSums[p.name] || 0) + user.age
            AgeCounts[p.name] = (AgeCounts[p.name] || 0) + 1
        })
    })

    const avgAgesByProduct = Object.fromEntries(
       products.map(product => {
            const AvgAge = AgeCounts[product.name] ? 
            AgeSums[product.name] / AgeCounts[product.name] : 
            MidAge

            return[product.name, normalize(AvgAge, MinAge, MaxAge)]
        }
    ))

    return {
        products,
        users,
        colorsindex,
        categoryindex,
        MinAge,
        MaxAge,
        MinPrice,
        MaxPrice,
        numCaregories: categories.length,
        numColors: colors.length,
        avgAgesByProduct,
        // price + age + one-hot categories + one-hot colors
        dimencions: 2 + categories.length + colors.length
    }
}

const oneHotWeight = (index, length, weight) => 
    tf.oneHot(index, length).cast('float32').mul(weight) 

function encodeProduct(product, ctx) {
    // normalizando os dados de preço e idade para o intervalo [0, 1]
    const price = tf.tensor1d([
        normalize(
            product.price, 
            ctx.MinPrice, 
            ctx.MaxPrice)* WEIGHTS.price
        ])
    const age = tf.tensor1d([
        (
            ctx.avgAgesByProduct[product.name] ?? 0.5
        ) * WEIGHTS.age
    ])

    const category = oneHotWeight(
        ctx.categoryindex[product.category], 
        ctx.numCaregories, 
        WEIGHTS.category
    )

    const color = oneHotWeight(
        ctx.colorsindex[product.color], 
        ctx.numColors, 
        WEIGHTS.color
    )
    return tf.concat1d([price, age, category, color])
}

function encodeUser(user, ctx) {
    if (user.purchases.length) {
        return tf.stack(
            user.purchases.map(
                product => encodeProduct(product, ctx)
            )
        ).mean(0)
        .reshape([1, ctx.dimencions])
    }

    return tf.concat1d([
        tf.zeros([1]), // price é ignorado para usuários sem compras
        tf.tensor1d([normalize(user.age, ctx.MinAge, ctx.MaxAge)* WEIGHTS.age]), // age
        tf.zeros([ctx.numCaregories]), // categories é ignorado para usuários sem compras
        tf.zeros([ctx.numColors]) // colors é ignorado para usuários sem compras
    ]).reshape([1, ctx.dimencions])
}
function creteTrainingData(ctx) {
    const inputs = []
    const labels = []
    ctx.users
    .filter(user => user.purchases.length)
    .forEach(user => {
        const userVector = encodeUser(user, ctx).dataSync()
        ctx.products.forEach(product => {
            const productVector = encodeProduct(product, ctx).dataSync()
            
            const label = user.purchases.some(
                purchase => purchase.name === product.name) ? 1 : 0
            // combinat user + product
            inputs.push([...userVector, ...productVector])
            labels.push(label)
        })
    })
    return { 
        xs: tf.tensor2d(inputs),
        ys: tf.tensor2d(labels, [labels.length, 1]),
        inputDimensions: ctx.dimencions * 2
        //Tamaho = user vector + product vector
    }
}

async function configureNeuralNetAndTrain(trainingData) {

    const model = tf.sequential()
    model.add(tf.layers.dense({
        inputShape: [trainingData.inputDimensions],
        units: 128,
        activation: 'relu'
    }))
    model.add(tf.layers.dense({
        units: 64,
        activation: 'relu'
    }))
    model.add(tf.layers.dense({
        units: 32,
        activation: 'relu'
    }))
    model.add(tf.layers.dense({
        units: 1,
        activation: 'sigmoid'
    }))
    model.compile({
        optimizer: tf.train.adam(0.01),
        loss: 'binaryCrossentropy',
        metrics: ['accuracy']
    })
    await model.fit(trainingData.xs, trainingData.ys, {
        epochs: 100,
        batchSize: 32,
        shuffle: true,
        callbacks: {
            onEpochEnd: (epoch, logs) => {
                postMessage({
                    type: workerEvents.trainingLog,
                    epoch: epoch,
                    loss: logs.loss,
                    accuracy: logs.acc
                })
            }
        }
    }); return model

}

async function trainModel({ users }) {
    console.log('Training model with users:', users)

    postMessage({ type: workerEvents.progressUpdate, progress: { progress: 50 } })
    const products = await (await fetch('/data/products.json')).json()
    
    const context = makecontext(users, products)

    context.productsVectors = products.map(product => {
        return {
            name: product.name,
            meta: {...product},
            vector: encodeProduct(product, context).dataSync()
        }})


    _globalCtx = context

    const trainingData = creteTrainingData(context)

    _model = await configureNeuralNetAndTrain(trainingData)
    
    postMessage({ type: workerEvents.progressUpdate, progress: { progress: 100 } })
    postMessage({ type: workerEvents.trainingComplete })
}

function recommend(user, ctx) {
    if(!_model) return;
    
    const userVector = encodeUser(user, ctx).dataSync()
    const inputs = ctx.productsVectors.map(({vector}) => {
        return [...userVector, ...vector]
    })
    const inputTensor = tf.tensor2d(inputs)
    const predictions = _model.predict(inputTensor)
    const scores = predictions.dataSync()
    const recommendations = ctx.productsVectors.map((item,index) => {
        return {
            ...item.meta,
            name: item.name,
            score: scores[index]
        }
    })
    const sortedItems = recommendations.sort((a,b) => b.score - a.score)
    postMessage({
         type: workerEvents.recommend,
         user,
         recommendations: sortedItems
     })
}


const handlers = {
    [workerEvents.trainModel]: trainModel,
    [workerEvents.recommend]: d => recommend(d.user, _globalCtx),
}

self.onmessage = e => {
    const { action, ...data } = e.data
    if (handlers[action]) handlers[action](data)
}
