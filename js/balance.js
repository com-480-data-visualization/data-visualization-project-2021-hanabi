
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composites = Matter.Composites,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Composite = Matter.Composite,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Vector = Matter.Vector;
// create engine
var engine = Engine.create(),
    world = engine.world;
// create renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: innerWidth,
        height: innerHeight-50,
        wireframes: false,
        background: 'white',
        showAngleIndicator: false,
        showCollisions: false,
        showVelocity: false
    }
});
Render.run(render);
// create runner
var runner = Runner.create();
Runner.run(runner, engine);
// add bodies
var group = Body.nextGroup(true);
var stack = Composites.stack(250, 255, 1, 6, 0, 0, function(x, y) {
    return Bodies.rectangle(x, y, 30, 30);
});

var partA = Bodies.rectangle(400, 110, 500, 20, { collisionFilter: { group: group }, render: { fillStyle: 'grey'} }),
    partB = Bodies.circle(650, 110, 10, { collisionFilter: { group: group }, render: { fillStyle: 'grey'} }),
    partC = Bodies.circle(150, 110, 10, { collisionFilter: { group: group }, render: { fillStyle: 'grey'} });

var catapult = Body.create({
        parts: [partA, partB, partC],
        collisionFilter: { group: group }
});

// chain
var count = 0;
var ropeA = Composites.stack(650, 110, 6, 1, 10, 10, function(x, y) {
    count++
    return Bodies.circle(x, y, 20, { collisionFilter: { group: group }, render: {
        fillStyle: "rgb(" + String(count*20) + "," + String(count*20) +", 255)",
    } });
});

Composites.chain(ropeA, 0.5, 0, -0.5, 0, { stiffness: 0.8, length: 2, render: { type: 'line', strokeStyle: 'blue' } });
Composite.add(ropeA, Constraint.create({ 
    bodyB: ropeA.bodies[0],
    bodyA: catapult,
    pointB: { x: -10, y: 0 },
    pointA: { x: 250, y: 0 },
    stiffness: 0.5,
    render: {type: 'line', strokeStyle: 'blue'}
}));

count = 0;
var ropeB = Composites.stack(150, 110, 6, 1, 10, 10, function(x, y) {
    count++
    return Bodies.circle(x, y, 20, { collisionFilter: { group: group }, render: {
        fillStyle: "rgb(255," + String(count*20) + "," + String(count*20) +")",
    } });
});

Composites.chain(ropeB, 0.5, 0, -0.5, 0, { stiffness: 0.8, length: 2, render: { type: 'line', strokeStyle: 'red'} });
Composite.add(ropeB, Constraint.create({ 
    bodyB: ropeB.bodies[0],
    bodyA: catapult,
    pointB: { x: -10, y: 0 },
    pointA: { x: -250, y: 0 },
    stiffness: 0.5,
    render: {type: 'line', strokeStyle: 'red'}
}));

Composite.add(world, [
    catapult,
    ropeA,
    ropeB,
    // Bodies.rectangle(400, 600, innerWidth, 50.5, { isStatic: true, render: { fillStyle: '#060a19' },  }),
    Bodies.rectangle(400, 60, 20, 120, { isStatic: true, collisionFilter: { group: group }, render: { fillStyle: 'grey'} }),
    Constraint.create({ 
        bodyA: catapult, 
        pointB: Vector.clone(catapult.position),
        stiffness: 1,
        length: 0
    }),
]);

// add mouse control
var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });
Composite.add(world, mouseConstraint);
// keep the mouse in sync with rendering
render.mouse = mouse;
// fit the render viewport to the scene
Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: 800, y: 600 }
});