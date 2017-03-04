(function() {
    'use strict';
    angular.module("bvha2")
        .constant("Constant", {
            "month": ["January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
            ],
            "ContactType": [
                "Mobile", "Home", "Office", "Other"
            ],
            "TransactionType": [{
                value: 0,
                description: "All"
            }, {
                value: 1,
                description: "Water"
            }, {
                value: 2,
                description: "Utility Rental"
            }, {
                value: 3,
                description: "Court"
            }, {
                value: 3,
                description: "Clubhouse"
            }, {
                value: 4,
                description: "Shooting"
            }, {
                value: 5,
                description: "Other"
            }]
        })
}())