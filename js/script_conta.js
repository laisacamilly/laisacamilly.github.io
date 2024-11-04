document.addEventListener('DOMContentLoaded', function () {
    openCameraButton = document.querySelector('#openCameraButton');
    cameraPopup = document.querySelector('#cameraPopup');
    video = document.querySelector('#video');
    photo = document.querySelector('#photo');
    tirar_foto = document.querySelector('#tirar-foto');
    tentar_novamente = document.querySelector('tentar-novamente');
    enviar = document.querySelector('#enviar');
    fechar = document.querySelector('#fechar');
    nome = document.querySelector('input[type="text"]').value;
    enviar_nome = document.querySelector('#enviar-nome');

    let stream; // Para armazenar o stream da câmera

    // Função para abrir o Popup e iniciar a câmera
    async function openCameraPopup() {
        cameraPopup.style.display = 'flex';
        try {
            stream = await navigator.mediaDevices.getUserMedia({ video: true });
            video.srcObject = stream;
            video.style.display = 'block';
            tirar_foto.style.display = 'inline-block';
            tentar_novamente.style.display = 'none';
            enviar.style.display = 'none';
            photo.style.display = 'none';
        } catch (error) {
            console.error("Erro ao acessar a câmera: ", error);
        }
    }

    // Função para capturar a foto
    tirar_foto.addEventListener('click', () => {
        canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Exibe a imagem capturada
        imageDataUrl = canvas.toDataURL('image/png');
        photo.src = imageDataUrl;
        photo.style.display = 'block';
        video.style.display = 'none';

        // Alterna os botões
        tirar_foto.style.display = 'none';
        tentar_novamente.style.display = 'inline-block';
        enviar.style.display = 'inline-block';
    });

    // Função para tentar novamente (voltar para o modo de vídeo)
    tentar_novamente.addEventListener('click', () => {
        video.style.display = 'block';
        photo.style.display = 'none';
        tirar_foto.style.display = 'inline-block';
        tentar_novamente.style.display = 'none';
        enviar.style.display = 'none';
    });

    // Função para fechar o Popup e parar o vídeo
    fechar.addEventListener('click', closeCameraPopup);
    function closeCameraPopup() {
        cameraPopup.style.display = 'none';
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
    }

    // Evento para abrir o Popup da câmera ao clicar no botão
    openCameraButton.addEventListener('click', openCameraPopup);

    enviar.addEventListener('click', function () {
        localStorage.setItem('photo', imageDataUrl);
        console.log(imageDataUrl)
    });

    enviar_nome.addEventListener('click', function () {
        localStorage.setItem('nome', nome);
        console.log(nome)
    });
})