/**
 * This function will take the _uploading_started_at line item property key from order line items
 * and return the folder path where user has uploaded images for that item
 */
export default function getS3FolderPath(str) {
    let arr = str.split("_");
    switch (arr[2]) {
        case 'Jan':
            return arr[3] + '/1/' + arr[1];
            break;

        case 'Feb':
            return arr[3] + '/2/' + arr[1];
            break;

        case 'Mar':
            return arr[3] + '/3/' + arr[1];
            break;

        case 'Apr':
            return arr[3] + '/4/' + arr[1];
            break;

        case 'May':
            return arr[3] + '/5/' + arr[1];
            break;

        case 'Jun':
            return arr[3] + '/6/' + arr[1];
            break;

        case 'Jul':
            return arr[3] + '/7/' + arr[1];
            break;

        case 'Aug':
            return arr[3] + '/8/' + arr[1];
            break;

        case 'Sep':
            return arr[3] + '/9/' + arr[1];
            break;

        case 'Oct':
            return arr[3] + '/10/' + arr[1];
            break;

        case 'Nov':
            return arr[3] + '/11/' + arr[1];
            break;

        case 'Dec':
            return arr[3] + '/12/' + arr[1];
            break;

        default:
            return null;
            break;
    }
}
