import { create } from "zustand"

// interface useAirMonitoringStore_type{
//     value:boolean
// }
interface value_type{
    value:string
}
interface success_type{
    component:value_type
    set_component:(state:value_type)=>void
}


const useBlogStore = create<success_type>((set) => ({
    component: {
     value:"nodata"
      },
      set_component: (state:value_type) => set({ component: state}),

    
    
}))

export default useBlogStore