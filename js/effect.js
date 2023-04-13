const DATA_FOR_EFFECT = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  },
];

const effectsElement = document.querySelector('.effects');
const imageElement = document.querySelector('.img-upload__preview img');
const fieldEffectLevel = document.querySelector('.img-upload__effect-level');
const sliderElement = fieldEffectLevel.querySelector('.effect-level__slider');
const inputSlider = fieldEffectLevel.querySelector('.effect-level__value');

let chosenEffect = DATA_FOR_EFFECT[0];

const isDefaultFillter = () => chosenEffect === DATA_FOR_EFFECT[0];

const showSlider = () => {
  fieldEffectLevel.classList.remove('hidden');
};

const hideSlider = () => {
  fieldEffectLevel.classList.add('hidden');
};

const updateSLider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.max,
  });
  if(isDefaultFillter()) {
    hideSlider();
  } else {
    showSlider();
  }
};

const onEffectsChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenEffect = DATA_FOR_EFFECT.find((effect) => effect.name === evt.target.value);
  imageElement.className = `effects__preview--${chosenEffect.name}`;
  updateSLider();
};

const onSliderUpdate = () => {
  const sliderValue = sliderElement.noUiSlider.get();
  imageElement.style.filter = isDefaultFillter();
  if (isDefaultFillter()) {
    imageElement.style.filter = DATA_FOR_EFFECT[0].style;
  } else {
    imageElement.style.filter = `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  }
  inputSlider.value = sliderValue;
};

const resetEffects = () => {
  imageElement.style.filter = DATA_FOR_EFFECT[0].style;
  imageElement.className = 'effects__preview--none';
  hideSlider();
};

noUiSlider.create(sliderElement, {
  range: {
    min: DATA_FOR_EFFECT[0].min,
    max: DATA_FOR_EFFECT[0].max,
  },
  start: DATA_FOR_EFFECT[0].max,
  step: DATA_FOR_EFFECT[0].step,
  connect: 'lower',
});

hideSlider();

effectsElement.addEventListener('change', onEffectsChange);
sliderElement.noUiSlider.on('update', onSliderUpdate);

export { resetEffects };
