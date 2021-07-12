const form = document.querySelector('.ad-form');
const formFieldsets = form.querySelectorAll('fieldset');

const disableAdForm = () => {
  form.classList.add('ad-form--disabled');

  formFieldsets.forEach((fieldset) => {
    fieldset.disabled = true;
  });
};

const enableAdForm = () => {
  form.classList.remove('ad-form--disabled');
  formFieldsets.forEach((fieldset) => {
    fieldset.disabled = false;
  });
};

export {disableAdForm, enableAdForm};
