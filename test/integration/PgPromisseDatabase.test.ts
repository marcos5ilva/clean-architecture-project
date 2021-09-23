import PgPromisseDatabase from '../../src/infra/database/PgPromisseDatabase';

test('Should connect database and list items', async function () {
	const pgPromisseDatabase = PgPromisseDatabase.getInstance();
	const items = await pgPromisseDatabase.many('select * from ccca.item', []);
	console.log(items);
});
