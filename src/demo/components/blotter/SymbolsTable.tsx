import * as React from 'react';
import * as fdc3 from '../../../client/index';
import {Symbol} from '../../apps/BlotterApp';
import {SymbolsRow} from './SymbolsRow';
import {IApplication} from '../../../client/index';

interface SymbolsTableProps {
    items?: Symbol[];
}



async function loadCharts() {
    return fdc3.resolve(fdc3.Intents.VIEW_CHART);
}

export function SymbolsTable(props: SymbolsTableProps): React.ReactElement {
    const {items} = props;
    const [chartApps, setChartApps] = React.useState<IApplication[]>([]);
    const [selectedItem, setSelectedItem] = React.useState<Symbol | null>(items![0] || null);
    const handleSelect = (item: Symbol | null) => {
        setSelectedItem(item);
    };

    React.useEffect(() => {
        loadCharts().then(apps => {
            setChartApps(apps);
        });
    }, []);

    return (
        <table className="w3-table-all w3-hoverable">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Bid Size</th>
                    <th>Bid Price</th>
                    <th>Ask Size</th>
                    <th>Ask Price</th>
                    <th>{}</th>
                </tr>
            </thead>
            <tbody>
                {items && items.map((item) => <SymbolsRow key={item.name} item={item} selected={item === selectedItem} chartApps={chartApps} handleSelect={handleSelect} />)}
            </tbody>
        </table>
    );
}
