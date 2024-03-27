import React from "react";
import { Input, Button} from "@material-tailwind/react";

export function Form() {

    return (
      <div className="relative mt-8 flex flex-col items-center justify-center gap-4 min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <h6 className="text-blueGray-700 text-xl font-bold">Selamat Datang!</h6>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 md:flex-row">
            <div className="w-80">
                {/* @ts-ignore */}
                <Input 
                  label="Lokasi anda saat ini" 
                  placeholder="Lokasi saat ini"
                  // value={"Perum ITS Jl. Teknik Sipil W20"} 
                />
            </div>
            <Button placeholder={"Pilih lokasi"} size="md" className="lg:w-max shrink-0" fullWidth color="blue" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              Pilih lokasi
            </Button>
          </div>
        </div>
      </div>
    );
}

export default Form;