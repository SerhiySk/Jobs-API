const { register } = require('../controllers/auth');
const router = require('express').Router();
const {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} = require('../controllers/jobs');

router.route('/').get(getAllJobs).post(createJob);
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob);

router.get('/another-route', (req, res) => {
  // router code here
});

module.exports = router;
