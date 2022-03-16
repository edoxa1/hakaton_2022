const selectCategory = (category_type) => {
    console.log(category_type.target.id)
    console.log(devicesData[category_type.target.id]);
};

document.querySelector('.categories').addEventListener('click', selectCategory);