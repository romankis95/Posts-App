import { AbstractControl } from "@angular/forms";
import { Observable } from "rxjs";

export const MimeType = (control: AbstractControl): Promise<{[key:string]:any}> | Observable<{[key:string]:any}> => {
    const file = control.value as File;
    const fileReader = new FileReader();
 const frObs = Observable.create((observer: {
     complete(): unknown; next: (arg0: { [x: string]: any; }) => void; error: (arg0: null) => void; 
}) => {
        fileReader.addEventListener("loadend", () => {
            const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4);
            let header = "";
            let isValid = false;
            for (let i = 0; i < arr.length; i++) {
                header += arr[i].toString(16); // toString(16) converts the number to a hexadecimal string
            }
            switch (header) {
                case "89504e47": // PNG
                    isValid = true;
                    break;
                case "ffd8ffe0": // JPEG
                case "ffd8ffe1":    // JPEG
                case "ffd8ffe2": // JPEG
                case "ffd8ffe3":// JPEG
                case "ffd8ffe8":// JPEG
                    isValid = true;
                    break;
                default:
                    isValid = false;
                    break;
            }
            if (isValid) {
                observer.next(null);
            } else {
                observer.next({ invalidMimeType: true }); // invalidMimeType is the name of the error
            }
            observer.complete();
        });
        fileReader.readAsArrayBuffer(file);
    });
    return frObs;
}; 
// this is a function that takes a control and returns an object with a key of type string and a value of type any

