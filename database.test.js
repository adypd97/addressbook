const db = require('./database');

beforeAll(async () => {
	await db.sequelize.sync();
});

//first test creates a person record
test('create person', async () => {
	expect.assertions(1);
	const person = await db.Person.create({
		id: 1,
		firstName: 'Sammy',
		lastName: 'David Jr.',
		email: 'sammy@example.com'
	});
	expect(person.id).toEqual(1);
});

// noew we retrieve row with id=1 that we created above
test('get person', async () => {
	expect.assertions(2);
	const person = await db.Person.findByPk(1);
	expect(person.firstName).toEqual('Sammy');
	expect(person.lastName).toEqual('David Jr.');
});

// now we test removing the person
test('delete person', async () => {
	expect.assertions(1);
	await db.Person.destroy({
		where: {
			id: 1
		}
	});
	const person = await db.Person.findByPk();
	expect(person).toBeNull();
});

// finally close the connection
afterAll(async () => {
	await db.sequelize.close();
});

