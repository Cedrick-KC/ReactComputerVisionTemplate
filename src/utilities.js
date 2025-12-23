export const drawRect = (detections, ctx) => {
    detections.forEach(prediction => {
        const [x, y, width, height] = prediction.bbox;
        const text = `${prediction.class} (${Math.round(prediction.score * 100)}%)`;

        ctx.strokeStyle = "lime";
        ctx.lineWidth = 2;
        //ctx.strokeRect(x, y, width, height);

        ctx.fillStyle = "lime";
        ctx.font = "16px Arial";
        /*ctx.fillText(
            `${prediction.class} (${Math.round(prediction.score * 100)}%)`,
            x,
            y > 10 ? y - 5 : 10
        );*/
        ctx.beginPath();
        ctx.fillText(text, x, y > 10 ? y - 5 : 10);
        ctx.rect(x, y, width, height);
        ctx.stroke(); });
};
