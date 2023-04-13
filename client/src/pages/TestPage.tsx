import React from "react";

export const TestPage = () => {
  return (
    <section className="table-page">
      <div style={{ width: "100%", overflowX: "scroll" }}>
        <table>
          <thead>
            <tr>
              <th style={{ position: "sticky", left: 0, zIndex: 1 }}>
                Column 1
              </th>
              <th style={{ position: "sticky", left: 0, zIndex: 1 }}>
                Column 2
              </th>
              <th style={{ position: "sticky", left: 0, zIndex: 1 }}>
                Column 3
              </th>
              <th style={{ position: "sticky", left: 0, zIndex: 1 }}>
                Column 4
              </th>
              <th style={{ position: "sticky", left: 0, zIndex: 1 }}>
                Column 5
              </th>
              <th>Column 6</th>
              <th>Column 7</th>
              <th>Column 8</th>
              <th>Column 9</th>
              <th>Column 10</th>
              <th>Column 11</th>
              {/* Add the remaining columns here */}
              <th>Column 38</th>
              <th>Column 39</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ position: "sticky", left: 0, zIndex: 2 }}>
                Fixed Content 1
              </td>
              <td style={{ position: "sticky", left: 0, zIndex: 2 }}>
                Fixed Content 2
              </td>
              <td style={{ position: "sticky", left: 0, zIndex: 2 }}>
                Fixed Content 3
              </td>
              <td style={{ position: "sticky", left: 0, zIndex: 2 }}>
                Fixed Content 4
              </td>
              <td style={{ position: "sticky", left: 0, zIndex: 2 }}>
                Fixed Content 5
              </td>
              <td>Scrollable Content 1</td>
              <td>Scrollable Content 2</td>
              <td>Scrollable Content 3</td>
              <td>Scrollable Content 4</td>
              <td>Scrollable Content 5</td>
              <td>Scrollable Content 6</td>
              {/* Add the remaining columns here */}
              <td>Scrollable Content 34</td>
              <td>Scrollable Content 35</td>
            </tr>
            {/* Add more rows here */}
          </tbody>
        </table>
      </div>
    </section>
  );
};
