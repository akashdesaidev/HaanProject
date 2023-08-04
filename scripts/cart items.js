let cart = [];
cart =[
    {
        "id" : 1,
        "img" : "https://cdn.shopify.com/s/files/1/0511/9066/1293/products/Pack3_SA_MF.jpg?v=1678874635",
        "name" : "3 Hand Sanitizers Mystic Foliage",
        "discounted_price" : 1350,
        "price" : 1650,
        "pack" : 3,
        "category" : "sanitizer",
        "description" : "Cleanse and moisturize your hands with this formula with Aloe Vera that eliminates 99.99% of bacteria. This Mystic Foliage collection will leave your hands delicately scented and remind you of the warmness of the tropics and the exotic flora."
    },
    {
        "id" : 2,
        "img" : "https://cdn.shopify.com/s/files/1/0511/9066/1293/products/Pocket_SA_MF_TalesLotus_1.jpg?v=1678356415",
        "name" : "Hand Sanitizer Tales of Lotus",
        "discounted_price" : 590,
        "price" : 600,
        "pack" : 1,
        "category" : "sanitizer",
        "description" : "Cleanse and moisturize your hands with this formula with Aloe Vera that eliminates 99.99% of bacteria. The Tales of Lotus fragrance will leave your skin a delicate scent of delicate water petals with white figs and dry fruit notes." 
    },
    {
        "id" : 3,
        "img" :"https://cdn.shopify.com/s/files/1/0511/9066/1293/products/Pocket_SA_MF_ForestGrace.jpg?v=1678356444",
        "name" : "Hand Sanitizer Forest Grace",
        "discounted_price" : 480,
        "price" : 590,
        "pack" : 1,
        "category" : "sanitizer",
        "description" : "Cleanse and moisturize your hands with this formula with Aloe Vera that eliminates 99.99% of bacteria. The Forest Grace fragrance will leave your skin a delicate fresh and fruity scent that will remind you of a tropical rainforest."
    },
    {
        "id" : 4,
        "img" : "https://cdn.shopify.com/s/files/1/0511/9066/1293/products/Refill_SA_MF_ForestGrace.jpg?v=1678356460",
        "name" : "Hand Sanitizer Refill Forest Grace",
        "discounted_price" : 790,
        "price" : 1490,
        "pack" : 1,
        "category" : "sanitizer",
        "description" : "Cleanse and moisturize your hands with this formula with Aloe Vera that eliminates 99.99% of bacteria. The Forest Grace fragrance will leave your skin a delicate fresh and fruity scent that will remind you of a tropical rainforest."
    },
    {
        "id" : 5,
        "img" : "https://cdn.shopify.com/s/files/1/0511/9066/1293/products/Pocket_SA_MF_WildOrchid_5052f880-3d50-4442-82d2-e3c4eebc8159.jpg?v=1678356511",
        "name" : "Hand Sanitizer Wild Orchid",
        "discounted_price" : 480,
        "price" : 590,
        "pack" : 1, 
        "category" : "sanitizer",
        "description" : "Cleanse and moisturize your hands with this formula with Aloe Vera that eliminates 99.99% of bacteria. The Wild Orchid fragrance will leave your skin a delicate scent of wild orchids, vanilla and Indian Sandalwood." 
    },
    {
        "id" : 6,
        "img" : "https://cdn.shopify.com/s/files/1/0511/9066/1293/products/082.jpg?v=1651510073",
        "name" : "Hydrating Hand Sanitizer - 3 Pack",
        "discounted_price" : 1350,
        "price" : 1590,
        "pack" : 3,
        "category" : "sanitizer",
        "description" : "In ancient times, medicinal flowers and herbs were commonly used to achieve great advantages for the body and the mind. This is why we have packed them together to bring you only the best of the best. Our tested formula is full of natural ingredients to leave your hands soft and healthy while killing 99.99% of virus and bacteria."
    }
]

localStorage.setItem("cartItems",JSON.stringify(cart));