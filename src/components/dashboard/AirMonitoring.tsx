import NoData from "./NoData"

const AirMonitoring = () => {
  return (
    <div >
<div className="text-[20px] font-[600] text-BrandBlack1">
  Air Monitoring
</div>
<NoData
 buttonFunction={()=>alert("working")}

/>
    </div>
  )
}

export default AirMonitoring