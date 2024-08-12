'use strict';

window.addEventListener('DOMContentLoaded', () => {

    const listIngred = [
        {
            name: 'Икра кабачковая (Света Тищенко)',
            ingred: ['лук: 1000г', 'морковь: 1000г', 'сахар: 1с', 'уксус: 100г', 'масло(подсолнечное): 100г', 'соль: 3с', 'честнок: 100г', 'паста: 500г'],
            value: 6000,
            keyItem: 'Кабачки',
            descr: 'На крупную терку, тушить 1,5 часа. Потушить на сковородке + масло подсолнечное чуть-чуть. Все перекрутить на мясорубке. Тушить 25 минут. Все перемешать + еще кипятить в банках 0,5 стерелизовать 20 шт. и замотать. Выход: 12 - 13 банок по 0,5 л.'
        },
        {
            name: 'Борщова приправа (Людмила Петровна)',
            ingred: ['перец(сладкий): 3000г', 'лук: 1500г', 'морковка: 1500г', 'масло(подсолнечное): 500г'],
            value: 10000,
            keyItem: 'Помидоры',
            descr: 'Все перекрутить на мясорубку. Тушить 1 час. Соль и сахар по вкусу.'
        },
        {
            name: 'Икра кабачковая без уксуса (перетертая)',
            ingred: ['мука: 500г', 'морковь: 1000г', 'сахар: 4с', 'соль: 3с', 'соус: 485г'],
            value: 3000,
            keyItem: 'Кабачки чищеные',
            descr: 'Соли 2 - 3 столовые ложки (по вкусу). Мука обтарить на масле. Обтарить кабачки + лук + морковь, взбить взбить ??? блендером. Тушить на медленном огне. За 1 час до готовности добавить любой соус. Выход 7 - 8 банок по 0,5.'
        },
        {
            name: 'Кабачки с соусом сацебели (Людмила Петровна)',
            ingred: ['соль: 2с', 'сацебели: 485г', 'сахар: 18с', 'масло(растительное): 200г', 'уксус: 200г', 'честнок: 2г', 'перец(черный-молотый): 1ч', 'перец(красный-молотый): 1ч'],
            value: 5000,
            keyItem: 'Кабачки молодые',
            descr: 'Кабачки молодые порезать ??? по 2 ???. Тушить 30 минут с момента закипания. Разложить по банкам. Выход 6 литровых банок.'
        },
    ];

    if (window.location.href.split('/')[window.location.href.split('/').length - 1] === '' ||
        window.location.href.split('/')[window.location.href.split('/').length - 1] === 'index.html') {

        // set last data

        const title = document.querySelector('.info__title');
        const listWrapper = document.querySelector('.info__ingred');
        const lastObj = JSON.parse(localStorage.getItem('last'));
        const inputVal = document.querySelector('.info__input');
        const label = document.querySelector('.info__label');
        const descr = document.querySelector('.info__descr');

        if (lastObj) {
            title.textContent = lastObj['name'];
            title.setAttribute('data-i', localStorage.getItem('index'));
            inputVal.value = localStorage.getItem('inputValue');
            label.textContent = lastObj['keyItem'] !== 'Води' ? `${lastObj['keyItem']} в кг:` : 'Води в л'; 
            descr.textContent = lastObj['descr'];
    
            lastObj['ingred'].forEach(item => {
                    const arrOfIng = item.split(' ');
                    const itemToList = document.createElement('li');
                    itemToList.classList.add('info__item');
                    itemToList.innerHTML = `<li class='info__item'><span>${arrOfIng[0]}</span> ${arrOfIng[1]}</li>`
    
                    listWrapper.append(itemToList);
            });
        }

        const listOfVal = [];

            for (let i = 0; i < listWrapper.children.length; i++) {
                listOfVal.push(lastObj['ingred'][i].split(' ')[1].slice(0, -1))
            }

            let tmp = [];

            listOfVal.forEach(item => {
                let n = item / lastObj['value'] * 1000;

                tmp.push(Math.round(n * +localStorage.getItem('inputValue') * 100) / 100);
            });

            const listOfIngredToChange = [...listWrapper.children];

            listOfIngredToChange.forEach((item, i) => {
                const splitedText = item.textContent.split(' ');

                splitedText[1] = splitedText[0] === 'перец(черный-молотый):' || splitedText[0] === 'перец(красный-молотый):' ? `${tmp[i]}ч` : splitedText[0] === 'сахар:' || splitedText[0] === 'соль:' ? `${tmp[i]}c` : tmp[i] >= 1000 ? `${tmp[i] / 1000}кг` : `${tmp[i]}г`;

                item.innerHTML = `<span>${splitedText[0]}</span> ${splitedText[1]}`
            })


        // Add buttons

        const btnList = document.querySelector('.main__wrapper');

        listIngred.forEach((obj, i) => {
            const listItem = document.createElement('div');

            listItem.classList.add('main__item');
            listItem.setAttribute('data-i', i);
            listItem.textContent = obj['name'];

            btnList.append(listItem);
        })

        // Search

        const inputToSearch = document.querySelector('.main__input');
        const btns = [...btnList.children];

        inputToSearch.addEventListener('input', e => {
            const target = e.target
            
            btns.forEach(btn => {
                console.log(btn.textContent.slice(0, target.value))
                if (btn.textContent.slice(0, target.value.length) !== target.value) {
                    btn.style.display = 'none';
                } else {
                    btn.style.display = 'block';
                }
            });
        });
        

        // Render ingred

        const itemsArr = document.querySelectorAll('.main__item');
        const listOfIngred = document.querySelector('.info__ingred');
        const nameOfRec = document.querySelector('.info__title');
        const infoDescr = document.querySelector('.info__descr')

        itemsArr.forEach(item => {
            item.addEventListener('click', e => {
                const target = e.target;

                nameOfRec.textContent = target.textContent;
                nameOfRec.setAttribute('data-i', item.getAttribute('data-i'));

                label.textContent = listIngred[nameOfRec.getAttribute('data-i')]['keyItem'] !== 'Води' ? `${listIngred[nameOfRec.getAttribute('data-i')]['keyItem']} в кг:` : 'Води в л'; 

                inputVal.value = listIngred[nameOfRec.getAttribute('data-i')]['value'] / 1000;
                localStorage.setItem('last', JSON.stringify(listIngred[nameOfRec.getAttribute('data-i')]))
                localStorage.setItem('index', nameOfRec.getAttribute('data-i'))
                listOfIngred.textContent = '';
                infoDescr.textContent = listIngred[nameOfRec.getAttribute('data-i')]['descr'];

                listIngred[item.getAttribute('data-i')]['ingred'].forEach(name => {
                    const arrOfIng = name.split(' ');
                    const itemToList = document.createElement('li');
                    itemToList.classList.add('info__item');
                    itemToList.innerHTML = `<li class='info__item'><span>${arrOfIng[0]}</span> ${arrOfIng[1]}</li>`

                    listOfIngred.append(itemToList);
                })

            });
        })


        // Count value

        const inputOfVal = document.querySelector('.info__input');

        inputOfVal.addEventListener('input', e => {
            const target = e.target;
            const listOfVal = [];

            localStorage.setItem('inputValue', target.value);

            for (let i = 0; i < listOfIngred.children.length; i++) {
                listOfVal.push(listIngred[nameOfRec.getAttribute('data-i')]['ingred'][i].split(' ')[1].slice(0, -1))
            }

            let tmp = [];

            listOfVal.forEach(item => {
                let n = item / listIngred[nameOfRec.getAttribute('data-i')]['value'] * 1000;

                tmp.push(Math.round(n * +target.value * 100) / 100);
            });

            const listOfIngredToChange = [...listOfIngred.children];

            listOfIngredToChange.forEach((item, i) => {
                const splitedText = item.textContent.split(' ');

                splitedText[1] = splitedText[0] === 'перец(черный-молотый):' || splitedText[0] === 'перец(красный-молотый):' ? `${tmp[i]}ч` : splitedText[0] === 'сахар:' || splitedText[0] === 'соль:' ? `${tmp[i]}c` : tmp[i] >= 1000 ? `${tmp[i] / 1000}кг` : `${tmp[i]}г`;

                item.innerHTML = `<span>${splitedText[0]}</span> ${splitedText[1]}`
            })

        })

    } else {

        // add ingred to list

        const addIngredInput = document.querySelector('.add__add');
        const addBtn = document.querySelector('.add__submit');
        const listOfIngred = document.querySelector('.add__ingred');

        let listOfAddedIngred = '';

        addBtn.addEventListener('click', () => {
            let flag = true;
            if (listOfIngred.children[0]) {
                [...listOfIngred.children].forEach(item => {
                    if (item.textContent.split(' ')[0].slice(0, -1) === addIngredInput.value.split(' ')[0]) {
                        flag = false;
                    }
                });
            }
            if (addIngredInput.value !== '' && +addIngredInput.value.split(' ')[1] / 1 > 0 && flag) {
                const splitedText = addIngredInput.value.split(' ');

                const itemToAdd = document.createElement('li');
                itemToAdd.classList.add('add__item');
                splitedText[1] = +splitedText[1] >= 1000 ? `${+splitedText[1] / 1000}кг` : `${+splitedText[1]}г`;
                itemToAdd.textContent = `${splitedText[0]}: ${splitedText[1]}`;
                itemToAdd.setAttribute('data-val', splitedText[1]);

                const cuttedText = itemToAdd.textContent.split(' ')[1].slice(0, -1);
    
                if (cuttedText[cuttedText.length - 1] === 'к') {
                    itemToAdd.setAttribute('data-val', itemToAdd.textContent.split(' ')[1].slice(0, -2) * 1000);
                } else {
                    itemToAdd.setAttribute('data-val', itemToAdd.textContent.split(' ')[1].slice(0, -1));
                }
    
                listOfIngred.append(itemToAdd);
    
                listOfAddedIngred = document.querySelector('.add__ingred');
                addIngredInput.value = '';
            }
        });

        // calc ingredients

        const inputFirst = document.querySelector('.add__input');
        const firstVal = document.querySelector('.add__val');

        inputFirst.addEventListener('input', e => {

            if (listOfAddedIngred.children) {

                const target = e.target;
                const listOfVal = [];
                const children = [...listOfAddedIngred.children]
    
                for (let i = 0; i < listOfAddedIngred.children.length; i++) {
                    listOfVal.push(+children[i].getAttribute('data-val'));
                }

                console.log(listOfVal)
    
                let tmp = [];
    
                listOfVal.forEach(item => {
                    let n = item / +firstVal.value;

                    tmp.push(Math.round(n * +target.value * 100) / 100);
                });
    
                const listOfIngredToChange = [...listOfIngred.children];
    
                listOfIngredToChange.forEach((item, i) => {
                    const splitedText = item.textContent.split(' ');
    
                    splitedText[1] = tmp[i] >= 1000 ? `${tmp[i] / 1000}кг` : `${tmp[i]}г`;
    
                    item.innerHTML = `<span>${splitedText[0]}</span> ${splitedText[1]}`
                });

            };
        });
    }

});