const resolvers = {
    Query: {
        user(root, args) {
            return {
                id: "01",
                name: "user01"
            }
        },
        users() {
            return [{
                    id: '01',
                    name: 'user01'
                },
                {
                    id: '02',
                    name: 'user02'
                },
                {
                    id: '03',
                    name: 'user03'
                }
            ];
        },
    },
    User: {
        Memos(user) {
            return [{
                _id: "",
                title: "",
                content: ""
            }];
        }
    },
    Post: {
        User(memo) {
            return {
                id: "",
                name: ""
            };
        }
    }
}