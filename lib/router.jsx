FlowRouter.route('/', {
    name: 'Dashboard',
    action() {
        //console.log("rendering Dashboard");
        ReactLayout.render(App, {
            content: <TaskList />,
            nav: <Nav />
        });
    }
});

FlowRouter.route('/login', {
    name: 'Login',
    action(){
        ReactLayout.render(App, {
            content: <Login />,
            nav: <Nav />
        })
    }
});

FlowRouter.route('/request', {
    name: 'Request',
    action(){
        ReactLayout.render(App, {
            content: <RequestForm name = "Request" />,
            nav: <Nav />
        })
    }
});

FlowRouter.route('/register', {
    name: 'Register',
    action(){
        ReactLayout.render(App, {
            content: <Register name = "Register" />,
            nav: <Nav />
        })
    }
});

FlowRouter.route('/registerSuccess', {
    name: 'RegisterSuccess',
    action(){
        ReactLayout.render(App, {
            content: <RegisterSuccess name = "RegisterSuccess" />,
            nav: <Nav />
        })
    }
});