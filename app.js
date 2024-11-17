function redeemPoints() {
    const pointsElement = document.getElementById('points');
    let points = parseInt(pointsElement.textContent);

    if (points >= 50) {
        points -= 50;
        alert('Vous avez échangé 50 points !');
    } else {
        alert('Pas assez de points pour un échange.');
    }

    pointsElement.textContent = points;
}
