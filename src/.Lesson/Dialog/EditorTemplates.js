export const gridTemplate = `<table style="border-collapse: collapse; width: 100%; height: 42px;" border="1">
                                <tbody>
                                    <tr style="height: 21px;">
                                        <td style="width: 33%; height: 21px;"></td>
                                        <td style="width: 34%; height: 21px;"></td>
                                        <td style="width: 33%; height: 21px;"></td>
                                    </tr>
                                    <tr style="height: 21px;">
                                        <td style="width: 33%; height: 21px;"></td>
                                        <td style="width: 34%; height: 21px;"></td>
                                        <td style="width: 33%; height: 21px;"></td>
                                    </tr>
                                </tbody>
                            </table>`

export const makeGrid = (columns, rows) => {
    const rowHeight = 21;
    const tableHeight = rowHeight * rows;
    const columnWidth = 100 / columns;

    const tdString = `<td style="width: ${columnWidth}%; height: ${rowHeight}px;"></td>`
    const trString = `<tr style="height: ${rowHeight}px;">${tdString.repeat(columns)}</tr>`
    const tbodyString = `<tbody>${trString.repeat(rows)}</tbody>`
    const tableString = `<table style="border-collapse: collapse; width: 100%; height: ${tableHeight}px;" border="1">${tbodyString}</table>`

    return tableString;
}