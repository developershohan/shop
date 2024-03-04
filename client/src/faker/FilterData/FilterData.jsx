export const filters = [
    {
        id: 'color',
        name: 'Color',
        options: [
            { value: 'white', label: 'White' },
            { value: 'beige', label: 'Beige' },
            { value: 'blue', label: 'Blue' },
            { value: 'brown', label: 'Brown' },
            { value: 'green', label: 'Green' },
            { value: 'purple', label: 'Purple' },
        ],
    },
    {
        id: 'size',
        name: 'Size',
        options: [
            { value: '2l', label: '2L' },
            { value: '6l', label: '6L' },
            { value: '12l', label: '12L' },
            { value: '18l', label: '18L' },
            { value: '20l', label: '20L' },
            { value: '40l', label: '40L' },
        ],
    },
]
export const singleFilters = [
    {
        id: 'price',
        name: 'Price',
        options: [
            { value: '100-199', label: '$100 to $199' },
            { value: '200-299', label: '$200 to $299' },
            { value: '300-399', label: '$300 to $399' },
            { value: '400-499', label: '$400 to $499' },
            { value: '500-599', label: '$500 to $599' },
            { value: '600-699', label: '$600 to $699' },
        ],
    },
    {
        id: 'discount',
        name: 'Discount',
        options: [
            { value: '10', label: '10% and Above' },
            { value: '20', label: '20% and Above' },
            { value: '30', label: '30% and Above' },
            { value: '40', label: '40% and Above' },
            { value: '50', label: '50% and Above' },
            { value: '60', label: '60% and Above' },
            { value: '70', label: '70% and Above' },
            { value: '80', label: '80% and Above' },

        ],
    }, {
        id: "stock",
        name: "Avilablity",
        options: [
            { value: "in-stock", label: "In Stock" },
            { value: "out-of-stock", label: "Out of Stock" },
        ]
    }
]