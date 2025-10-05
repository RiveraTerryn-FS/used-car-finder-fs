// Imports your SCSS stylesheet
import './styles/index.scss';
import vehicles from './car-dataset.json';
import {toggleDisable, createElements, classExists, sortArray} from "./js/utilities.js";
const uY = [...new Set(vehicles.map(v => v.year))].sort((a, b) => b - a);
const yearSelect = document.querySelector('#vehicle-year-section select');
const makeSelect = document.querySelector('#vehicle-make-section select');
const modelSelect = document.querySelector('#vehicle-model-section select');
const makeSection = document.querySelector('#vehicle-make-section');
const modelSection = document.querySelector('#vehicle-model-section');
const filterVehicles = ({ year = null, make = null, model = null }) => {
    try { 
        if (!Array.isArray(vehicles)) throw new Error('Array expected');
        if (year && isNaN(year)) return [];
        if (make && typeof make !== 'string') return [];
        if (model && typeof model !== 'string') return [];
        return vehicles.filter(v => {
            return (year ? v.year === year : true)
                && (make ? v.Manufacturer.toLowerCase() === make.toLowerCase() : true)
                && (model ? v.model.toLowerCase() === model.toLowerCase() : true);
        });
        } catch (err) {
        console.error('filterVehicles error:', err);
        return [];
    }
}
(() => {
    try {
        createElements(yearSelect, uY, 'Vehicle Year');
        yearSelect.addEventListener('change', (e) => {
            try {
                const val = parseInt(e.currentTarget.value);
                if(!isNaN(val) && val) {
                    const make = filterVehicles({year: val});
                    if(classExists(makeSection,'disabled'))
                        toggleDisable(makeSection);
                    createElements(makeSelect, sortArray(make, 'Manufacturer'), 'Vehicle Make');
                } else {
                    if(!classExists(makeSection,'disabled'))
                        toggleDisable(makeSection);
                }
                if(!classExists(modelSection,'disabled'))
                    toggleDisable(modelSection);
            } catch (err) {
                console.error('Error in yearSelect listener:', err);
            }
        });
        makeSelect.addEventListener('change', (e) => {
            try {
                const val = e.currentTarget.value;
                if(isNaN(val)) {
                    const model = filterVehicles({year: parseInt(yearSelect.value), make: val});
                    if(classExists(modelSection,'disabled'))
                        toggleDisable(modelSection);
                    createElements(modelSelect, sortArray(model, 'model'), 'Vehicle Model');
                } else {
                    if(!classExists(modelSection,'disabled'))
                        toggleDisable(modelSection);
                }
            } catch (err) {
                console.error('Error in makeSelect listener:', err);
            }
        });
        modelSelect.addEventListener('change', (e) => {
            try {
                const val = e.currentTarget.value;
                if(isNaN(val)) {
                    const model = filterVehicles({
                        year: parseInt(yearSelect.value), 
                        make: makeSelect.value, 
                        model: val
                    });
                    console.log(model);
                }
            } catch (err) {
                console.error('Error in modelSelect listener:', err);
            }
        });
    } catch (err) {
        console.error('Error in IIFE:', err);
    }
})();