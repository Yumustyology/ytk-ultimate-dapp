export const customStyles = {
    rows: {
        style: {
            minHeight: '72px', // override the row height
            backgroundColor: '#181918',
            color:'white'
        },
    },
    headCells: {
        style: {
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
            backgroundColor: '#181918',
            color:'white'
        },
    },
    cells: {
        style: {
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px',
            backgroundColor: '#181918',
            color:'white',
        },
    },
    pagination: {
      style: {
        color: '#ddd',
        fontSize: '13px',
        minHeight: '56px',
        backgroundColor: '#181918',
        borderTopStyle: 'solid',
        borderTopWidth: '1px',
        borderTopColor: 'white',
        opacity:0.6
      },
      pageButtonsStyle: {
        borderRadius: '50%',
        height: '40px',
        width: '40px',
        padding: '8px',
        margin: 'px',
        cursor: 'pointer',
        transition: '0.4s',
        color: 'blue',
        fill: 'white',
        backgroundColor: 'transparent',
        '&:disabled': {
          cursor: 'unset',
          color: '#ddd',
          fill: '#ddd',
          opacity: 0.2
        },
        '&:hover:not(:disabled)': {
          backgroundColor: 'grey',
        },
        '&:focus': {
          outline: 'none',
          backgroundColor:'',
        },
      },
    },
    noData: {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color:'#ddd',
        backgroundColor:'#181918',
      },
    },
    progress: {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color:'#191c2f',
        backgroundColor:'#181918',
      },
    },
};
