const canvas = document.getElementById('snowfall-canvas');
  const ctx = canvas.getContext('2d');
  const snowflakes = [];

  let snowfallEnabled = false;

  function toggleSnowfall() {
    snowfallEnabled = !snowfallEnabled;
    if (snowfallEnabled) {
      startSnowfall();
    } else {
      stopSnowfall();
    }
  }

  function startSnowfall() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    snowflakes.length = 0; // Réinitialiser la liste des flocons
    createSnowflakes();
    animateSnowfall();
  }

  function stopSnowfall() {
      cancelAnimationFrame(animationFrameId);
      snowflakes.length = 0; // Clear the array
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function createSnowflakes() {
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 3 + 1; // Taille du flocon
      const speed = Math.random() * 2 + 1; // Vitesse du flocon
      const angle = Math.random() * Math.PI * 2; // Angle initial

      snowflakes.push({ x, y, radius, speed, angle });
    }
  }

  function animateSnowfall() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const snowflake of snowflakes) {
      snowflake.y += snowflake.speed;
      snowflake.x += Math.sin(snowflake.angle) * 0.5; // Ajout du mouvement latéral

      ctx.beginPath();
      ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff'; // Couleur blanche pour les flocons
      ctx.fill();
      ctx.closePath();

      // Réinitialiser le flocon en haut lorsqu'il atteint le bas de l'écran
      if (snowflake.y > canvas.height) {
        snowflake.y = 0;
      }
    }

    if (snowfallEnabled) {
      animationFrameId = requestAnimationFrame(animateSnowfall);
    }
  }