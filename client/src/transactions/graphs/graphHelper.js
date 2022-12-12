function getRandomBackgroundColors(labels) {
    const backgroundColors = []

    for (let i = 0; i < labels.length; i++) {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        const backgroundColor =
            'rgba('
            + r + ','
            + g + ','
            + b + ','
            + '0.8)'

        backgroundColors.push(backgroundColor)
    }

    return backgroundColors
}

export { getRandomBackgroundColors }