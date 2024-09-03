document.addEventListener('DOMContentLoaded', function(){

    //busca cep
    var botaoCep = document.getElementById('buscarCep');
    var enderecoDiv = document.getElementById('endereco');

    botaoCep.addEventListener('click', function(){
        var cep = document.getElementById('cep').value;

        if(cep.length !== 8 || isNaN(cep)){

            enderecoDiv.innerHTML = '<p class= "error"> Por favor, insira um CEP válido com 8 dígitos.</p>';
            return;
        }

        var meuAjaxCep = new XMLHttpRequest();
        meuAjaxCep.open('GET', `https://viacep.com.br/ws/${cep}/json/`, true);

        meuAjaxCep.onload = function(){
            if(meuAjaxCep.status ===200){
                var dados = JSON.parse(meuAjaxCep.responseText);
                if(dados.erro){
                    enderecoDiv.innerHTML = '<p class="error">CEP não encontrado. Verifique e tente novamente.</p>';

                }else{
                    enderecoDiv.innerHTML = `
                        <p> <strong>Logradouro:</strong> ${dados.logradouro}</p>
                        <p><strong>Bairro:</strong> ${dados.bairro}</p>
                        <p><strong>Cidade:</strong> ${dados.localidade}</p>
                        <p><strong>Estado:</strong> ${dados.uf}</p>
                    `;
                }
            } else {
                enderecoDiv.innerHTML = '<p class="error">Erro ao buscar o CEP. Tente novamente mais tarde.</p>';
            }
        };

        meuAjaxCep.send();
        
        });

        //buscar clima
    var botaoClima = document.getElementById('buscarClima');
    var climaDiv = document.getElementById('clima');
    var apiKey = 'insira sua api key aqui';

    botaoClima.addEventListener('click', function() {
        var cidade = document.getElementById('cidade').value;

        if(cidade === ''){
            climaDiv.innerHTML = '<p class="error">Por favor insira o nome de uma cidade.<p>';
            return;
        }

        var meuAjaxClima = new XMLHttpRequest();
        meuAjaxClima.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&lang=pt_br&units=metric`, true);

        meuAjaxClima.onload = function(){
            if (meuAjaxClima.status === 200) {

                var dadosClima = JSON.parse(meuAjaxClima.responseText);
                climaDiv.innerHTML=`
                <p><strong>Clima em ${dadosClima.name}:</strong></p>
                <p>Temperatura: ${dadosClima.main.temp}°C</p>
                <p>Condição: ${dadosClima.weather[0].description}</p>
                <p>Umidade: ${dadosClima.main.humidity}%</p>
                <p>Vento: ${dadosClima.wind.speed}m/s</p>
            `;
        }else{
            climaDiv.innerHTML = '<p class="error">Cidade não encontrada. Tente novamente.<p>'
            }
        };

        meuAjaxClima.send();

    })


});
   


