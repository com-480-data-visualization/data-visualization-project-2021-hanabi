
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
        height: innerHeight-250,
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
var ropeA = Composites.stack(650, 110, 8, 1, 10, 10, function(x, y) {
    return Bodies.rectangle(x - 20, y, 50, 20, { collisionFilter: { group: group }, chamfer: 5 });
});

Composites.chain(ropeA, 0.3, 0, -0.3, 0, { stiffness: 1, length: 0 });
Composite.add(ropeA, Constraint.create({ 
    bodyB: ropeA.bodies[0],
    bodyA: catapult,
    pointB: { x: -10, y: 0 },
    pointA: { x: 250, y: 0 },
    stiffness: 0.5,
}));

var ropeC = Composites.stack(650, 110, 8, 1, 10, 10, function(x, y) {
    return Bodies.rectangle(x - 20, y, 50, 20, { collisionFilter: { group: group }, chamfer: 5 });
});

Composites.chain(ropeC, 0.3, 0, -0.3, 0, { stiffness: 1, length: 0 });
Composite.add(ropeC, Constraint.create({ 
    bodyB: ropeC.bodies[0],
    bodyA: catapult,
    pointB: { x: -10, y: 0 },
    pointA: { x: 250, y: 0 },
    stiffness: 0.5,
}));

var partA = Bodies.rectangle(700, 110, 200, 20, { collisionFilter: { group: group }, render: { fillStyle: 'grey'},
density: 0.05 }),
    partB = Bodies.circle(800, 110, 10, { collisionFilter: { group: group }, render: { fillStyle: 'grey'} }),
    partC = Bodies.circle(600, 110, 10, { collisionFilter: { group: group }, render: { fillStyle: 'grey'} });

var plateA = Body.create({
        parts: [partA, partB, partC],
        collisionFilter: { group: group }
});

Composite.add(ropeC, Constraint.create({ 
    bodyB: ropeC.bodies[7],
    bodyA: plateA,
    pointB: { x: 10, y: 0 },
    pointA: { x: -100, y: 0 },
    length: 0,
    stiffness: 0.5,
}));

Composite.add(ropeA, Constraint.create({ 
    bodyB: ropeA.bodies[7],
    bodyA: plateA,
    pointB: { x: 10, y: 0 },
    pointA: { x: 100, y: 0 },
    length: 0,
    stiffness: 0.5,
}));


var ropeB = Composites.stack(150, 110, 8, 1, 10, 10, function(x, y) {
    return Bodies.rectangle(x - 20, y, 50, 20, { collisionFilter: { group: group }, chamfer: 5});
});

Composites.chain(ropeB, 0.3, 0, -0.3, 0, { stiffness: 1, length: 0 });
Composite.add(ropeB, Constraint.create({ 
    bodyB: ropeB.bodies[0],
    bodyA: catapult,
    pointB: { x: -10, y: 0 },
    pointA: { x: -250, y: 0 },
    stiffness: 0.5,
}));

var ropeD = Composites.stack(150, 110, 8, 1, 10, 10, function(x, y) {
    return Bodies.rectangle(x - 20, y, 50, 20, { collisionFilter: { group: group }, chamfer: 5 });
});

Composites.chain(ropeD, 0.3, 0, -0.3, 0, { stiffness: 1, length: 0 });
Composite.add(ropeD, Constraint.create({ 
    bodyB: ropeD.bodies[0],
    bodyA: catapult,
    pointB: { x: -10, y: 0 },
    pointA: { x: -250, y: 0 },
    stiffness: 0.5,
}));

var partA = Bodies.rectangle(400, 110, 200, 20, { collisionFilter: { group: group }, render: { fillStyle: 'grey'},
density: 0.05 }),
    partB = Bodies.circle(500, 110, 10, { collisionFilter: { group: group }, render: { fillStyle: 'grey'} }),
    partC = Bodies.circle(300, 110, 10, { collisionFilter: { group: group }, render: { fillStyle: 'grey'} });

var plateB = Body.create({
        parts: [partA, partB, partC],
        collisionFilter: { group: group }
});

Composite.add(ropeD, Constraint.create({ 
    bodyB: ropeD.bodies[7],
    bodyA: plateB,
    pointB: { x: 10, y: 0 },
    pointA: { x: -100, y: 0 },
    length: 0,
    stiffness: 0.5,
}));

Composite.add(ropeB, Constraint.create({ 
    bodyB: ropeB.bodies[7],
    bodyA: plateB,
    pointB: { x: 10, y: 0 },
    pointA: { x: 100, y: 0 },
    length: 0,
    stiffness: 0.5,
}));

Composite.add(world, [
    catapult,
    ropeA,
    ropeD,
    ropeB,
    ropeC,
    plateA,
    plateB,
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
//Composite.add(world, mouseConstraint);
// keep the mouse in sync with rendering
render.mouse = mouse;
// fit the render viewport to the scene
Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: 800, y: 550 }
});