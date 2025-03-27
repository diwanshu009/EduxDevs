import Agent from "@/components/Agent";

export default function page() {
    return (
        <div>
            <h3>Interview Generation</h3>

            <Agent userName='You' userId='user1' type = 'generate' />
        </div>
    )
}
