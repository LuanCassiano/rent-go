'use strict'

const Route = use('Route')

Route.post('/api/authentication', 'AuthenticationController.store')

Route.post('/api/user', 'UserController.store')
Route.put('/api/user/:id', 'UserController.update')


Route.group(() => {
    Route.get('/api/van', 'VanController.index')
    Route.get('/api/van/:id', 'VanController.show')
    Route.post('/api/van', 'VanController.store')
    Route.put('/api/van/:id', 'VanController.update')
    Route.delete('/api/van/:id', 'VanController.destroy')


    Route.get('/api/passenger', 'PassengerController.show')
    Route.post('/api/passenger', 'PassengerController.store')
    Route.put('/api/passenger/:id', 'PassengerController.update')

    Route.get('/api/drivers', 'DriverController.index')
    Route.get('/api/driver/:id', 'DriverController.show')
    Route.post('/api/driver', 'DriverController.store')
    Route.put('/api/driver/:id', 'DriverController.update')
}).middleware(['auth'])