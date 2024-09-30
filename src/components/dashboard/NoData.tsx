import { Button } from "antd";



interface noData_type{
    buttonFunction:()=>void;
}

const NoData = ({buttonFunction}:noData_type) => {
  return (
    <div className="w-full flex flex-col items-center">

<div className="w-[212px] h-[206.94px] mb-[37px] mt-[114px]">
<img src="/nodata.svg" alt="image" className="w-full h-[auto]"  />
</div>

<div className="text-[18px] font-[600] text-BrandBlack1 mb-[4px]">No Data Uploaded</div>
<div className="text-[16px] font-[400] text-BrandBlack1">Start Uploading Data </div>


              <Button
                type="primary"
             onClick={buttonFunction}
                className="w-[234px] h-[48px] text-[16px] font-[400] mt-[16px] bg-BrandPrimary"
                
              >
                <div className="flex gap-x-[16px] items-center">
<img src="/cross.svg" alt="img"  className="w-[14px] h-[14px]"/>
<div className="text-[16px] font-[400]">Upload Data</div>
                </div>
              </Button>
           

    </div>
  )
}

export default NoData