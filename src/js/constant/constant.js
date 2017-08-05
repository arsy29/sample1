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
                description: "Water Dues"
            }, {
                value: 2,
                description: "Water Meter"
            }, {
                value: 3,
                description: "Shooting Fee"
            }, {
                value: 4,
                description: "Membership Fee"
            }, {
                value: 5,
                description: "Maintenance Fee"
            }, {
                value: 6,
                description: "ID"
            }, {
                value: 7,
                description: "Development Fee"
            }, {
                value: 8,
                description: "Court Use"
            }, {
                value: 9,
                description: "Construction Fee"
            }, {
                value: 10,
                description: "Construction Bond"
            }, {
                value: 11,
                description: "Sticker"
            }, {
                value: 12,
                description: "Other"
            }]
        })
}())