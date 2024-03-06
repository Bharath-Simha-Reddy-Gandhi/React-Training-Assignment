

export const SelectedStats = (props) =>{

    return(
        <>
        <table className="stats-table">
                      <tr className="stats-table-row">
                        <th>Name</th>
                        <th>Total</th>
                        <th>Total in last 30 days</th>
                        <th>Avg in last 30 days</th>
                      </tr>
                      {["downloads", "views"].map((item) => {
                        return (
                          <tr className="stats-table-row" key={item}>
                            <td>
                              {item.charAt(0).toUpperCase() + item.slice(1)}
                            </td>
                            <td>{props.userSelectedInfo[item].total}</td>
                            <td>{props.userSelectedInfo[item].historical.change}</td>
                            <td>{props.userSelectedInfo[item].historical.average}</td>
                          </tr>
                        );
                      })}
                    </table>
        </>
    )
}