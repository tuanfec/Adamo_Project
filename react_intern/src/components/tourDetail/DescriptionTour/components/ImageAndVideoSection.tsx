import { ImageAndVideo } from "@/types/tour";

interface ImageAndVideoSectionProps {
  data: ImageAndVideo;
}
export const ImageAndVideoSection: React.FC<ImageAndVideoSectionProps> = ({
  data,
}) => {
  return (
    <div className="mt-10">
      <div className="text-xl font-medium my-5">
        360° Panoramic Images and Videos
      </div>
      <div className="w-full h-[400px] mb-10">
        <iframe
          src={data?.map360ImageLink}
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
          title="360° Panoramic View"
        />
      </div>
      <div className="w-full h-[400px]">
        <iframe
          src={data?.mapVideoLink}
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          title="Tour Video"
        />
      </div>
    </div>
  );
};
