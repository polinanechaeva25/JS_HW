let app = {
    config: {
        rows: [8, 7, 6, 5, 4, 3, 2, 1],
        cols: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    },

    run() {
        //генерируем доску
        let board = this.generateBoard();
        //добавляем доску в body
        document.body.innerHTML = board;
        //помещаем на доску все фигуры кроме пешек
        this.insertFiguresOnDesk();
        //добавляем пешки
        this.insertPawns();
        //добавляем колонку с номерами строк
        this.insertRowsNumbers();
        //добавляем строку с названиями колонок
        this.insertColsChars();
    },

    /**
     * Метод вставляет пешки на доску.
     */
    insertPawns() {
        let whitePawnsRow = document.querySelectorAll('tr:nth-child(7) td');
        for (let i = 0; i < whitePawnsRow.length; i++) {
            whitePawnsRow[i].innerHTML = this.getFigure('pawn', 'whiteFigure');
        }

        let blackPawnsRow = document.querySelectorAll('tr:nth-child(2) td');
        for (let i = 0; i < blackPawnsRow.length; i++) {
            blackPawnsRow[i].innerHTML = this.getFigure('pawn', "blackFigure");
        }
    },

    /**
     * Метод вставляет на доску все фигуры, кроме пешек.
     */
    insertFiguresOnDesk() {
        for (let i = 0; i < positions.length; i++) {
            let cell = document.querySelector(`[data-rownum="${positions[i].coordRow}"][data-colchar="${positions[i].coordCol}"]`);
            let figure = this.getFigure(positions[i].figure, positions[i].color+"Figure");
            cell.innerHTML = figure;
        }
    },

    /**
     * Метод возвращает тег i в виде строки, с подставленным именем
     * фигуры и классом, управляющим цветом фигуры.
     * @param {string} name название фигуры, возможные значения rook, knight, bishop, queen, king, pawn.
     * @param {string} colorClass цвет фигуры, м.б. "whiteFigure", "blackFigure".
     * @returns {string} 
     */
    getFigure(name, colorClass) {
        return `<i class="fas fa-chess-${name} ${colorClass}"></i>`; // вставьте в ${} нужные значения
    },

    /**
     * Метод генерирует игровое поле 8 на 8.
     * @returns {string} html разметка в виде строки.
     */
    generateBoard() {
        let board = '';
        let rowStartWithColor = "white";
        for (let i = 0; i < this.config.rows.length; i++) {
            let row = "";
            if (rowStartWithColor == 'white') {
                row = this.generateRow('white', this.config.rows[i]);
                rowStartWithColor = "black";
            } else {
                row = this.generateRow("black", this.config.rows[i]);
                rowStartWithColor = "white";
            }
            board += row;
        }
        return `<table>${board}</table>`;
    },

    /**
     * Метод генерирует тег tr (строку игровой доски) с закрашенными тегами
     * td (ячейкам).
     * @param {string} startWithColor с какого цвета строка начинается от левого края,
     * м.б. "white", "black".
     * @param {number} rowNum номер строки от 8 до 1, т.к. шахматная доска формируется
     * сверху вниз, поэтому номер начинается с 8.
     * @returns {string} html-разметка, тег tr с оформленными внутри тегами td.
     */
    generateRow(startWithColor, rowNum) {
        let currentColorClass = startWithColor;
        let row = '';
        for (let i = 0; i < this.config.cols.length; i++) {
            let field = '';
            if (currentColorClass=="white") {
               field = this.generateField("white", rowNum , this.config.cols[i]);
               currentColorClass = "black";
            } else {
               field = this.generateField("black", rowNum, this.config.cols[i]);
                // 2.8 переменной currentColorClass присваиваем строку "white"
                currentColorClass= "white";
            }
            // 2.9 в переменную row дописываем с помощью += то что получилось в field
            row += field;
        }
        return `<tr>${row}</tr>`;
    },

    /**
     * Метод генерирует ячейку (тег td) с нужным классом цвета
     * и координатами на поле.
     * @param {string} color класс цвета ячейки, м.б. "white", "black".
     * @param {number} rowNum номер строки игровой доски.
     * @param {string} colChar буква колонки игровой доски.
     * @returns {string} html-разметка с заполненными атрибутами координат и классом цвета.
     */
    generateField(color, rowNum, colChar) {
        // 1. вставьте нужные значения в атрибуты
        return `<td data-rownum="${rowNum}" data-colchar="${colChar}" class="${color}"></td>`;
    },

    /**
     * Метод вставляет на существующую доску колонку 
     * слева, с указанием номера строки.
     */
    insertRowsNumbers() {
        // 7. получаем все теги tr
        let trs = document.querySelectorAll('tr');
        // 7.1 перебираем эти теги в цикле
        for (let i = 0; i < trs.length; i++) {
            // 7.2 создаем тег td
            let td = document.createElement('td');
            // 7.3 в текущий тег td в innerText вставляем номер строки из this.config.rows
            td.innerText = this.config.rows[i];
            // 7.4 получившийся тег td вставляем в текущую строку (тег tr)
            trs[i].insertAdjacentElement("afterbegin", td);
        }
    },

    /**
     * Метод создает строку (tr) с названиями колонок в виде букв,
     * а также в начале вставляет пустую ячейку, которая идет под
     * цифрами.
     */
    insertColsChars() {
        // 8. создаем тег tr
        let tr = document.createElement('tr');
        // 8.1 затем в innerHTML тега tr дописываем пустой тег td
        tr.innerHTML += '<td></td>';
        // 8.2 в цикле перебираем колонки из this.config.cols
        for (let i = 0; i < this.config.cols.length; i++) {
            // 8.3 в innerHTML с помощью += дописываем тег td c буквой текущей колонки из this.config.cols
            tr.innerHTML += `<td>${this.config.cols[i]}</td>`;
        }
        // 8.4 получаем тег tbody
        let tbody = document.querySelector('tbody');
        // 8.5 и в него перед </tbody> вставляем значение из переменной tr
        tbody.insertAdjacentElement('beforeend', tr);
    },
}

app.run();
