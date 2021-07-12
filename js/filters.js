const filters = document.querySelector('.map__filters');
const filterSelects = filters.querySelectorAll('select');
const filterFeatures = filters.querySelector('.map__features');

const disableFilters = () => {
  filters.classList.add('map__filters--disabled');
  filterSelects.forEach((select) => {
    select.disabled = true;
  });
  filterFeatures.disabled = true;
};

const enableFilters = () => {
  filters.classList.remove('map__filters--disabled');
  filterSelects.forEach((select) => {
    select.disabled = false;
  });
  filterFeatures.disabled = false;
};

export {disableFilters, enableFilters};
