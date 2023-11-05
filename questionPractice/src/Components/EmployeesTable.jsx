import { useEffect, useState } from "react";
import Pagination from "./Pagination";

const baseUrl = "https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees"

export const EmployeesTable = () => {
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1)
  const [limit, setLimit] = useState(10)
  const [totalPages, SetTotalPages] = useState(0);
  const [filter, setFilter] = useState("");

  const getData = async (url) => {
    try {
      const res = await fetch(url)
      const jsonData = await res.json();
      console.log(jsonData)
      //Storing Data
      setData(jsonData.data);
      SetTotalPages(jsonData.totalPages)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (filter == "") {
      const newUrl = baseUrl + `?page=${pageNumber}&limit=${limit}`;
      getData(newUrl)
    } else {
      const newUrl = baseUrl + `?page=${pageNumber}&limit=${limit}&filterBy=department&filterValue=${filter}`;
      getData(newUrl)
    }
  }, [pageNumber, limit, filter])

  //for pagination
  const handlePageChange = (pageNum) => {
    setPageNumber(pageNum)
  }

  const filterChange = (e) => {
    setPageNumber(1)
    setFilter(e.target.value)
  }

  // console.log(filter)
  return (
    <div>
      <div>
        <div>
          {/* implement Department dropdown here */}
          <select className="department_list" value={filter} onChange={(e) => { filterChange(e) }}>
            <option value="">--Select Department--</option>
            <option value="hr">hr</option>
            <option value="finance">finance</option>
            <option value="marketing">marketing</option>
            <option value="engineering">engineering</option>
            <option value="operations">operations</option>
          </select>
        </div>
      </div>
      <div className="table_container">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Department</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody className="tbody">
            {/* populate all rows here */}
            {
              data.map((ele) => {
                return (
                  <tr key={ele.id}>
                    <td>{ele.id}</td>
                    <td className="name">{ele.name}</td>
                    <td className="gender">{ele.gender}</td>
                    <td className="department">{ele.department}</td>
                    <td className="salary">{ele.salary}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
      {/* import Pagination component here */}
      <Pagination totalPages={totalPages} handlePageChange={handlePageChange} currentPage={pageNumber} />
    </div>
  );
};



//For pagination buttons
// let arr = [];
// for (let i = 1; i <= jsonData.totalPages; i++) {
//   arr.push(i);
// }