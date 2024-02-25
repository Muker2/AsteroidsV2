const canv = document.getElementById("gameCanvas");
const ctx = canv.getContext("2d");
const FPS = 30;
const SHIP_SIZE = 30;
const SHIP_THRUST = 5;
const TURN_SPEED = 360;
const FRICTION = 1;

const ship = {
    x: canv.width / 2,
    y: canv.height / 2,
    r: SHIP_SIZE / 2,
    a: 90 / 180 * Math.PI,
    rot: 0,
    thrusting: false,
    thrust: {
        x: 0,
        y: 0
    }
}

document.addEventListener("keydown", (event) => {
    switch (event.code) {
        case "ArrowLeft":
            ship.rot = TURN_SPEED / 180 * Math.PI / FPS;
            break;
        case "ArrowRight":
            ship.rot = -TURN_SPEED / 180 * Math.PI / FPS;
            break;
        case "ArrowUp":
            ship.thrusting = true;
    }

}
)

document.addEventListener("keyup", (event) => {
    switch (event.code) {
        case "ArrowLeft":
            ship.rot = 0;
            break;
        case "ArrowRight":
            ship.rot = 0;
            break;
        case "ArrowUp":
            ship.thrusting = false;
            break;
    }

}
)

setInterval(update, 1000 / FPS);

function update() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height);

    if (ship.thrusting) {
        ship.thrust.x += SHIP_THRUST * Math.cos(ship.a) / FPS;
        ship.thrust.y -= SHIP_THRUST * Math.sin(ship.a) / FPS;
    } else {
        ship.thrust.x -= FRICTION * ship.thrust.x / FPS;
        ship.thrust.y -= FRICTION * ship.thrust.y / FPS;
    }

    ctx.strokeStyle = "white";
    ctx.lineWidth = SHIP_SIZE / 20;
    ctx.beginPath();
    ctx.moveTo(
        ship.x + ship.r * Math.cos(ship.a),
        ship.y - ship.r * Math.sin(ship.a)
    )
    ctx.lineTo(
        ship.x - ship.r * (Math.cos(ship.a) + Math.sin(ship.a)),
        ship.y + ship.r * (Math.sin(ship.a) - Math.cos(ship.a))
    )
    ctx.lineTo(
        ship.x - ship.r * (Math.cos(ship.a) - Math.sin(ship.a)),
        ship.y + ship.r * (Math.sin(ship.a) + Math.cos(ship.a))
    )
    ctx.closePath();

    ctx.stroke();

    //rotate ship
    ship.a += ship.rot;

    //move ship
    ship.x += ship.thrust.x;
    ship.y += ship.thrust.y;

    if (ship.x < 0 - ship.r) {
        ship.x = canv.width + ship.r;
    } else if (ship.x > canv.width + ship.r) {
        ship.x = 0 + ship.r;
    }

    if (ship.y < 0 + ship.r) {
        ship.y = canv.height + ship.r;
    } else if (ship.y > canv.height + ship.r) {
        ship.y = 0 + ship.r;
    }


}

