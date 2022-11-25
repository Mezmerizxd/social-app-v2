import './styles.scss';

interface LoadingDefaultProps {
    isLoading: boolean;
    name: string;
    style?: any;
}

export default function LoadingDefault({
    isLoading,
    name,
    style,
}: LoadingDefaultProps) {
    return (
        isLoading && (
            <div className="Loading-container" style={style}>
                <div className="Loading-default" id={name} key={name}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        )
    );
}
