import axios from "axios";
import jwtDecode from "jwt-decode";
import Link from "next/link";
import useScript from "../commonFunction/ReloadJs";

const DailyCancelProductOrderReturn = (props) => {
  useScript("/assets/js/app.js");

  const getDailyCancelProductOrderReturn = props.data;
  console.log(getDailyCancelProductOrderReturn);

  return (
    <div>
      <div className="row">
        <div className="col-md-12 m-b-30">
          <div className="d-block d-sm-flex flex-nowrap align-items-center">
            <div className="page-title mb-2 mb-sm-0">
              <h1>List of daily cancel product order return</h1>
            </div>
            <div className="ml-auto d-flex align-items-center">
              <nav>
                <ol className="breadcrumb p-0 m-b-0">
                  <li className="breadcrumb-item">
                    <a href="index.html">
                      <i className="ti ti-home" />
                    </a>
                  </li>
                  <li className="breadcrumb-item">Tables</li>
                  <li className="breadcrumb-item active text-primary" aria-current="page">
                    List of daily cancel product order return
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card card-statistics">
            <div className="card-body">
              <div className="datatable-wrapper table-responsive">
                <table id="datatable" className="display compact table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>Serial</th>
                      <th>Date</th>

                      <th>Outlet/Agent information</th>
                      <th>Invoice</th>
                      <th>Delivery Type</th>
                      <th>Delivery Address</th>
                      <th>Total product</th>
                      <th>Total qty</th>
                      <th>Total price</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getDailyCancelProductOrderReturn.map((item, index) => {
                      const agentInfo = item.agents[0];
                      const streetaddress = JSON.parse(item.deliveryDetails);
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.date}</td>

                          <td>
                            <a href="javascript:void(0);" className="btn btn-block btn-outline-info" data-toggle="modal" data-target={`#loginModal${index}`}>
                              Information
                            </a>
                            <div className="modal fade" id={`loginModal${index}`} tabIndex="{-1}" role="dialog" aria-labelledby="loginModal" aria-hidden="true">
                              <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5 className="modal-title">Agent Details</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">×</span>
                                    </button>
                                  </div>
                                  <div className="modal-body">
                                    <div className="datatable-wrapper table-responsive">
                                      <table id="datatable" className="display compact table table-striped table-bordered">
                                        <tbody>
                                          <tr>
                                            <th>Agent Name</th>
                                            <td>{agentInfo.name}</td>
                                          </tr>
                                          <tr>
                                            <th>Agent Phone Number</th>
                                            <td>{agentInfo.number}</td>
                                          </tr>
                                          <tr>
                                            <th>Agent Email</th>
                                            <td>{agentInfo.email}</td>
                                          </tr>
                                          <tr>
                                            <th>Agent Address</th>
                                            <td>{agentInfo.officeAddress}</td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                          <Link href={`/order-return-invoice/${item.invoiceNumber}`}>
                            <td>
                              <a href="javascript:void(0);" className="btn btn-block btn-outline-info">
                                {item.invoiceNumber}
                              </a>
                            </td>
                          </Link>

                          <td> {streetaddress.effectiveDelivery}</td>
                          <td>{streetaddress.streetaddress}</td>
                          {/* <td>
                          {item.memberDetails[0].city} ,{item.memberDetails[0].districts}, {item.memberDetails[0].division}
                        </td> */}
                          <td>{item.totalProduct}</td>
                          <td>{item.totalQty}</td>
                          <td>{item.totalPrice}</td>
                          <td>
                            <label className="badge mb-0 badge-warning-inverse ">{item.status}</label>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export async function getServerSideProps({ req }) {
//   const token = req.cookies.token;
//   const decodedToken = jwtDecode(token);

//   const { data } = await axios.get(process.env.API_URL + "/userPanel/v1/GetDailyReturnCancelOrderList/" + decodedToken.userId);
//   // console.log(data)
//   if (!data) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: { data },
//   };
// }
export async function getServerSideProps({ req }) {
  const token = req.cookies.token;
  const decodedToken = jwtDecode(token);
  const { data } = await axios.get(process.env.API_URL + "/userPanel/v1/GetDailyReturnCancelOrderList/" + decodedToken.userId);
  // console.log(data);
  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data },
  };
}
export default DailyCancelProductOrderReturn;