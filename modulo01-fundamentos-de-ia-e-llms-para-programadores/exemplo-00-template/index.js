process.env.TF_CPP_MIN_LOG_LEVEL = '3';
import tf, { mod, train } from '@tensorflow/tfjs-node';

async function trainModel(inputXs, outputYs) {
    // Criamos um modelo sequencial simples
    const model = tf.sequential();  

    // Primeira camada da rede
    // Entrada de 7 posições (idade normalizada + 3 cores + 3 localizações)
    // 80 neurônios e função de ativação ReLU
    // ReLU age como um filtro, permitindo que apenas valores positivos passem adiante, o que ajuda a rede a aprender padrões complexos.
    // Quanto mais neurônios, mais complexa a rede, mas também mais difícil de treinar.
    model.add(tf.layers.dense({ inputShape: [7], units: 80, activation: 'relu' }));

    // Saida do modelo, com 3 neurônios (um para cada categoria) e função de ativação softmax
    // Softmax transforma os valores de saída em probabilidades, indicando a confiança do modelo em cada categoria.
    model.add(tf.layers.dense({ units: 3, activation: 'softmax' }));


    // Compilamos o modelo, definindo a função de perda e o otimizador
    // Optimizador Adam é uma escolha popular para redes neurais, pois ajusta a taxa de aprendizado durante o treinamento, o que pode levar a uma convergência mais rápida.
    // é um treinador pessoal moderno para a rede neural, ajudando-a a ajustar seus pesos de forma eficiente para minimizar a perda.
    // A função de perda 'categoricalCrossentropy' é adequada para problemas de classificação multi-classe, onde o modelo precisa prever a probabilidade de cada classe.
    // A categoria premium vai ser [1,0,0]
    // Quanto mais distante da previsão do modelo estiver da categoria correta, maior será a perda (o erro - loss), e o otimizador irá ajustar os pesos para reduzir essa perda.
    // exemplo classico de classificação de clientes em categorias premium, medium e basic, onde o modelo aprende a associar características como idade, cor e localização com a categoria correta.
    model.compile({
        loss: 'categoricalCrossentropy', // Função de perda para classificação multi-classe
        optimizer: 'adam', // Otimizador eficiente para redes neurais
        metrics: ['accuracy'] // Métrica para avaliar o desempenho do modelo
    });

    // Treinamos o modelo com os dados de entrada (inputXs) e as labels (outputYs)
    // O modelo ajusta seus pesos para minimizar a perda, aprendendo a associar as características dos clientes com suas categorias.
    await model.fit(inputXs, outputYs, {
        verbose:0, // 0 para não mostrar o progresso do treinamento
        epochs: 100, // Número de vezes que o modelo verá todo o conjunto de dados
        shuffle: true, // Embaralha os dados a cada época para melhorar o aprendizado
        callbacks:{
            // onEpochEnd: (epoch, logs) => 
            //     console.log(`Epoch ${epoch}: loss = ${logs.loss}
            //         `)
        }
    })
    return model
}

async function predictCategory(model, inputData) {
    // Criamos um tensor a partir dos dados de teste normalizados
    // trasforma o tensorPessoaTesteNormalizado em um tensor 2D, que é o formato esperado pelo modelo para fazer previsões.
    const inputTensor = tf.tensor2d(inputData);

    // Faz predição (output sera um vetor de 3 probabilidades, uma para cada categoria)
    const prediction = model.predict(inputTensor);
    const predarray = await prediction.array(); // Converte o tensor de previsão em um array JavaScript para facilitar a leitura dos resultados.
    console.log("Probabilidades de cada categoria (premium, medium, basic):", predarray[0]);
}
// Exemplo de pessoas para treino (cada pessoa com idade, cor e localização)
// const pessoas = [
//     { nome: "Erick", idade: 30, cor: "azul", localizacao: "São Paulo" },
//     { nome: "Ana", idade: 25, cor: "vermelho", localizacao: "Rio" },
//     { nome: "Carlos", idade: 40, cor: "verde", localizacao: "Curitiba" }
// ];

// Vetores de entrada com valores já normalizados e one-hot encoded
// Ordem: [idade_normalizada, azul, vermelho, verde, São Paulo, Rio, Curitiba]
// const tensorPessoas = [
//     [0.33, 1, 0, 0, 1, 0, 0], // Erick
//     [0, 0, 1, 0, 0, 1, 0],    // Ana
//     [1, 0, 0, 1, 0, 0, 1]     // Carlos
// ]

// Usamos apenas os dados numéricos, como a rede neural só entende números.
// tensorPessoasNormalizado corresponde ao dataset de entrada do modelo.
const tensorPessoasNormalizado = [
    [0.33, 1, 0, 0, 1, 0, 0], // Erick
    [0, 0, 1, 0, 0, 1, 0],    // Ana
    [1, 0, 0, 1, 0, 0, 1]     // Carlos
]

// Labels das categorias a serem previstas (one-hot encoded)
// [premium, medium, basic]
const labelsNomes = ["premium", "medium", "basic"]; // Ordem dos labels
const tensorLabels = [
    [1, 0, 0], // premium - Erick
    [0, 1, 0], // medium - Ana
    [0, 0, 1]  // basic - Carlos
];

// Criamos tensores de entrada (xs) e saída (ys) para treinar o modelo
const inputXs = tf.tensor2d(tensorPessoasNormalizado)
const outputYs = tf.tensor2d(tensorLabels)

const model = await trainModel(inputXs, outputYs)

const pessoaTeste = [
    { nome: "Maria", idade: 28, cor: "azul", localizacao: "São Paulo" }
]
// Normalizamos os dados de teste da mesma forma que os dados de treino
// exemplo de normalização: idade de 28 anos, idade minima é 25 e a máxima é 40, então a idade normalizada é (28-25)/(40-25) = 0.2
// exemplo de normalização de cores: azul = [1,0,0], vermelho = [0,1,0], verde = [0,0,1]
// exemplo de normalização de localização: São Paulo = [1,0,0], Rio = [0,1,0], Curitiba = [0,0,1]
const tensorPessoaTesteNormalizado = [
    [0.2, 1, 0, 0, 0, 0, 1] // Maria
]

await predictCategory(model, tensorPessoaTesteNormalizado)

