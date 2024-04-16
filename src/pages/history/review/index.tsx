import { Card, CardBody, Typography } from "@material-tailwind/react";
import Image from "next/image"
import Sidebar from "@/components/sidebar"

export default function Review(){
  return(
    <>
      <Sidebar/>
      <div className="relative md:grid ml-5 mr-5 min-h-screen mt-8 place-items-start justify-center gap-2 ">
        {/* <div className="divide-y divide-blue-gray-100"> */}
          <div className="relative place-items-start justify-center gap-2">
            <div className=" mt-4 w-full flex flex-row items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
              <Image className="object-cover rounded-none rounded-s-lg" src="/image/food2.jpg" alt="" width={150} height={150}/>
              <div className="flex flex-col divide-y divide-gray-200 justify-between p-4 leading-normal">
                <div className="mb-2">
                  <p className="mb-2 font-bold tracking-tight text-gray-900">Kantin Pusat ITS</p>
                  <p className="mb-1 font-light text-gray-700">Jl. Teknik Mesin No 173, Keputih, Sukolilo, Surabaya</p>
                </div>
              </div>
            </div>
            <form className=" mt-6 p-4 w-full flex flex-row items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl">
              <Card
                shadow={false}
                color="transparent"
                className="grid items-center gap-6 " placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
              >
                <CardBody className="p-0 gap-5 flex " placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                  <div className=" !m-0 h-full  w-full  max-h-[40px] max-w-[40px] ">
                    <Image
                      width={768}
                      height={768}
                      src={'/image/food-bg.jpg'}
                      alt="img"
                      className="h-full rounded w-full object-cover object-center"
                    />
                  </div>
                  <div>
                    <div className="flex gap-1 mb-3 items-center">
                      <Typography
                        variant="small"
                        className=" font-bold flex items-center gap-2 !text-gray-900" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                      >
                        Hasna Lathifah
                      </Typography>
                      
                    </div>
                    <div className="flex gap-1 mb-3 items-center">
                      <table>
                        <tbody>
                        <tr>
                            <th>
                              <Typography className="w-full font-normal !text-gray-500" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                Makanan
                              </Typography>
                            </th>
                            <td className="px-6">
                              <div className="rating">
                                <input type="radio" name="makanan" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="makanan" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="makanan" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="makanan" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="makanan" className="mask mask-star-2 bg-orange-400" />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th>
                              <Typography className="w-full font-normal !text-gray-500" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                Pelayanan
                              </Typography>
                            </th>
                            <td className="px-6">
                              <div className="rating">
                                <input type="radio" name="Pelayanan" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="Pelayanan" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="Pelayanan" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="Pelayanan" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="Pelayanan" className="mask mask-star-2 bg-orange-400" />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th>
                              <Typography className="w-full font-normal !text-gray-500" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                Kebersihan
                              </Typography>
                            </th>
                            <td className="px-6">
                              <div className="rating">
                                <input type="radio" name="kebersihan" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="kebersihan" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="kebersihan" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="kebersihan" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="kebersihan" className="mask mask-star-2 bg-orange-400" />
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="flex gap-1 mt-8 mb-3 items-center">  
                      <div className="sm:col-span-2">
                          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            <Typography
                            variant="small"
                            className=" font-bold flex items-center gap-2 !text-gray-900" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                            >
                              Tuliskan komentar anda
                            </Typography>
                          </label>
                          <textarea id="description" rows={8} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Write a product description here..."></textarea>
                      </div>              
                    </div>
                    <div className="flex gap-1 items-center">              
                      <label className="block mt-3 mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">
                        <Typography
                        variant="small"
                        className=" font-bold flex items-center gap-2 !text-gray-900" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                        >
                          Tambahkan foto
                        </Typography>
                      </label>
                    </div>
                    <div className="flex gap-1 mb-2 items-center">
                      <input type="file" className=" bg-transparent file-input file-input-bordered file-input-primary w-full max-w-xs" />
                    </div>
                    <div className="flex gap-1 mb-3 items-center">
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">{'SVG, PNG, JPG or GIF (MAX. 800x400px).'}</p>
                    </div>
                    <div className="flex gap-1 mt-4 mb-3 items-center">
                      <a href="/history" type="button" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800  ">Kirim</a>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </form>
          </div>
        {/* </div> */}
      </div>
    </>
  )
}