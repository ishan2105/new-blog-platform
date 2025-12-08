import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/user.controller'

export const userRoutes = {
  GET: getAllUsers,
  POST: createUser,
  PUT: updateUser,
  DELETE: deleteUser,
  getById: getUserById,
}
