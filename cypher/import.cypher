// known users
MERGE (u:User { id: '6ca2e9c0-f4ed-11e4-b443-353a40402a60' });
MERGE (u:User { id: 'a4310610-f5a6-11e4-ba02-016f3c9cfe99' });

// food
MATCH (f:Food { name: 'Spaghetti Carbonara', author: 'Colin Webb' }),(u:User { id: '6ca2e9c0-f4ed-11e4-b443-353a40402a60'})
MERGE (u)-[:CREATED { date: '2015-05-16T14:55:39.000Z' }]->(f)
MERGE (u)-[:LIKES { date: '2015-05-16T14:55:39.000Z' }]->(f)
RETURN f;

// insert labels for recipes
MATCH (r { name: 'Spaghetti Carbonara'})
SET r :Recipe
RETURN r;

MATCH (r { name: 'Spaghetti alla Carbonara'})
SET r :Recipe
RETURN r;

MATCH (r { name: '15 minute pasta'})
SET r :Recipe
RETURN r;

// likes
MATCH (f:Food { name: 'Spaghetti Carbonara', author: 'Colin Webb' }),(u:User { id: 'a4310610-f5a6-11e4-ba02-016f3c9cfe99'})
MERGE (u)-[:LIKES { date: '2015-05-16T15:00:00.500Z' }]-(f);

MATCH (f:Food { name: '15 minute pasta', author: 'Mary Berry' }),(u:User { id: 'a4310610-f5a6-11e4-ba02-016f3c9cfe99'})
MERGE (u)-[:LIKES { date: '2015-05-16T15:03:00.500Z' }]-(f);
