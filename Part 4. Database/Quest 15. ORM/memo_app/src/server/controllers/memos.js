module.exports = {
	findAll(req, res) {
		Memo.findAll().then(memo => {
			sendResult(res, memo);
		}).catch(error => {
			sendError(res, error);
		});
	},

	findById(req, res) {
		Memo.findById(req.params.id).then(memo => {
			sendResult(res, memo);
		}).catch(error => {
			sendError(res, error);
		});
	},

	create(req, res) {
		Memo.create({
			title: req.body.title,
			content: req.body.content
		}).then(memo => {
			sendResult(res, memo);
		}).catch(error => {
			sendError(res, error);
		});
	},

	update(req, res) {
		Memo.update(req.body, {
			where: {
				id: req.params.id
			}
		}).then(updatedMemo => {
			sendResult(res, updatedMemo);
		}).catch(error => {
			sendError(res, error);
		});
	},

	delete(req, res) {
		Memo.destroy({
			where: {
				id: req.params.id
			}
		}).then(deleteRecord => {
			sendResult(res, deleteRecord);
		}).catch(error => {
			sendError(res, error);
		});
	}
}

// helper
function sendResult(res, result) {
	res.status(200).json(result);
}

function sendError(res, result) {
	res.status(500).json(result);
}