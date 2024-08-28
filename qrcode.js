export function exibirQRCode() {
    const url = "https://github.com/anatoledo01";
  
    QRCode.toDataURL(url, function (err, qrCodeURL) {
      if (err) {
        console.error("Erro ao gerar QR Code:", err);
        return;
      }
  
      
      const newWindow = window.open("", "_blank");
      if (!newWindow) {
        console.error("Não foi possível abrir uma nova janela.");
        return;
      }
  
      // Adicionar o QR Code à nova janela
      newWindow.document.open();
      newWindow.document.write(`
         <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>QR Code</title>
                <style>
                    body {
                        margin: 0;
                        padding: 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 100vh;
                        background-image: url('/Imagens/bg.png'); /* Substitua pelo caminho da sua imagem de fundo */
                        background-size: cover;
                        background-position: center;
                        color: white;
                        font-family: Arial, sans-serif;
                        text-align: center;
                    }

                    #qr-code {
                        background: rgba(0, 0, 0, 0.7); /* Fundo semi-transparente para melhorar a legibilidade */
                        border-radius: 15px;
                        padding: 30px;
                        max-width: 500px;
                        width: 100%;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                    }

                    .qr-content {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }

                    .profile-pic {
                        width: 100px;
                        height: 100px;
                        border-radius: 50%;
                        margin-bottom: 20px;
                        border: 3px solid white;
                    }

                    .message {
                        font-size: 24px;
                        font-weight: bold;
                        margin-bottom: 10px;
                    }

                    .name {
                        font-size: 20px;
                        margin-bottom: 20px;
                    }

                    #qr-code-img {
                        margin-top: 20px;
                    }
                </style>
            </head>
            <body>
                <div id="qr-code">
                    <div class="qr-content">
                        <img src="/Imagens/anatoledo.png" alt="Foto de perfil" class="profile-pic">
                        <p class="font-semibold">Ana Toledo</p>
                        <p class="font-bold">Me siga no GitHub</p>
                        <img src="${qrCodeURL}" alt="QR Code" id="qr-code-img">
                    </div>
                </div>
            </body>
            </html>
      `);
      newWindow.document.close();
    });
  }