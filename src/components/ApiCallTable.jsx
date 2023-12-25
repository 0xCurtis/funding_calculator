import React, { useEffect, useRef } from 'react';
import '@finos/perspective-viewer';
import perspective from '@finos/perspective';
import '@finos/perspective-viewer-datagrid';
import '@finos/perspective-viewer-d3fc';  

function ApiCallTable() {
    const viewerRef = useRef(null);
    const worker = perspective.worker();    
    
    useEffect(() => {
      const fetchData = async () => {
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // Replace with your preferred CORS proxy
        const targetUrl = 'https://api-futures.kucoin.com/api/v1/contracts/active';
        const response = await fetch(proxyUrl + targetUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        const data = json.data.map(item => ({
          symbol: item.symbol,
          FundingFeeRate: item.fundingFeeRate * 100
        }));
        console.log(data);
        return data;
      };
      
      const loadTable = async () => {
        try {
            const data = await fetchData();
            const table = await worker.table(data);
            const viewer = viewerRef.current;
            if (viewer) {
                customElements.whenDefined('perspective-viewer').then(() => {
                    viewer.load(table);
                    viewer.setAttribute('view', 'grid');
                    viewer.setAttribute('columns', JSON.stringify(['symbol', 'FundingFeeRate']));
                    // set floating point precision to 5
                    viewer.setAttribute('column-pivots', JSON.stringify(['FundingFeeRate']));
                    viewer.setAttribute('row-pivots', JSON.stringify(['symbol']));
                    viewer.setAttribute('aggregates', JSON.stringify({
                        symbol: 'distinct count',
                        FundingFeeRate: 'avg'
                    }));
                    viewer.setAttribute('sort', JSON.stringify([['symbol', 'desc']]));

                });
            }
        } catch (e) {
            console.error("Could not load data", e);
        }
    };

    loadTable();
    }, []);

    return (
      <perspective-workspace>
        <div className="PerspectiveViewer">
            <perspective-viewer ref={viewerRef}></perspective-viewer>
        </div>
      </perspective-workspace>
    );
}

export default ApiCallTable;
