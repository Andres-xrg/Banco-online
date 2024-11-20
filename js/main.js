function obtenerCotizaciones() {
    const loading = document.getElementById("loading");
    const cotizaciones = document.getElementById("cotizaciones");

    loading.style.display = "block";
    cotizaciones.style.display = "none";

    document.getElementById("dolar-euro").innerText = "";
    document.getElementById("dolar-bitcoin").innerText = "";
    document.getElementById("dolar-cop").innerText = "";


    setTimeout(() => {

        fetch('https://open.er-api.com/v6/latest/USD')
            .then(response => response.json())
            .then(data => {
                document.getElementById("dolar-euro").innerText = data.rates.EUR.toFixed(2);
            })
            .catch(error => console.error("Error con el Dólar a Euro:", error));

        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.coindesk.com/v1/bpi/currentprice.json');
        xhr.onload = function () {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                document.getElementById("dolar-bitcoin").innerText = data.bpi.USD.rate;
            } else {
                console.error("Error con el Dólar a Bitcoin:", xhr.statusText);
            }
        };
        xhr.send();

        (async function () {
            try {
                const response = await fetch('https://open.er-api.com/v6/latest/COP');
                const data = await response.json();
                const dolarCop = 1 / data.rates.USD;
                document.getElementById("dolar-cop").innerText = dolarCop.toFixed(2);
            } catch (error) {
                console.error("Error con el Dólar a Peso Colombiano:", error);
            }
        })();

        setTimeout(() => {
            loading.style.display = "none";
            cotizaciones.style.display = "block";
        }, 3000); 
    }, 2000); 
}

setInterval(obtenerCotizaciones, 10000);

obtenerCotizaciones();
