function createArrayOfSize(n) {
  return new Array(n).fill(0);
}

function Pagination({ totalPages, handlePageChange, currentPage }) {
  let pages = createArrayOfSize(totalPages).map((a, i) => {
    return <button data-testid="page-btn" key={i} onClick={
      () => { handlePageChange(i + 1) }
    }
      disabled={i + 1 === currentPage}
    >{i + 1}</button>;
  });
  // console.log(pages)
  return <div>
    {
      pages.map((e) => {
        return (
          e
        )
      })
    }
  </div>;
}

export default Pagination;
