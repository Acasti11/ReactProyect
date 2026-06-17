import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { vi } from "vitest";

import { PokemonLista } from "./PokemonList";
import { getGeneration } from "../../Services/PokeApi";

    vi.mock("../../Services/PokeApi");

    vi.mock("./SearchBar", () => ({
    SearchBar: ({ value, onChange }: any) => (
        <input
        data-testid="search-bar"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        />
    ),
    }));

    vi.mock("./FilterPanel", () => ({
    FilterPanel: ({
        types,
        selectedTypes,
        onToggleType,
        onClear,
    }: any) => (
        <div>
        {types.map((type: string) => (
            <button
            key={type}
            onClick={() => onToggleType(type)}
            >
            {type}
            </button>
        ))}

        <button onClick={onClear}>
            clear-filters
        </button>

        <div data-testid="selected-types">
            {selectedTypes.join(",")}
        </div>
        </div>
    ),
    }));

    vi.mock("./PokemonListContainer", () => ({
    PokemonListContainer: ({
        filteredPokemon,
        loadingState,
    }: any) => (
        <div>
        <div data-testid="loading-state">
            {loadingState}
        </div>

        {filteredPokemon.map((pokemon: any) => (
            <div key={pokemon.id}>
            {pokemon.name}
            </div>
        ))}
        </div>
    ),
    }));

    const mockPokemon = [
    {
        id: 25,
        name: "pikachu",
        types: [
        {
            type: {
            name: "electric",
            },
        },
        ],
    },
    {
        id: 6,
        name: "charizard",
        types: [
        {
            type: {
            name: "fire",
            },
        },
        {
            type: {
            name: "flying",
            },
        },
        ],
    },
    ];

    describe("PokemonLista", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    test("loads pokemon on mount", async () => {
        vi.mocked(getGeneration).mockResolvedValue(
        mockPokemon as any
        );

        render(<PokemonLista />);

        await waitFor(() => {
        expect(
            getGeneration
        ).toHaveBeenCalledWith(1);
        });

        expect(
        screen.getByText("pikachu")
        ).toBeInTheDocument();

        expect(
        screen.getByText("charizard")
        ).toBeInTheDocument();
    });

    test("shows success state after loading", async () => {
        vi.mocked(getGeneration).mockResolvedValue(
        mockPokemon as any
        );

        render(<PokemonLista />);

        await waitFor(() => {
        expect(
            screen.getByTestId("loading-state")
        ).toHaveTextContent("success");
        });
    });

    test("shows error state when api fails", async () => {
        vi.mocked(getGeneration).mockRejectedValue(
        new Error("api error")
        );

        render(<PokemonLista />);

        await waitFor(() => {
        expect(
            screen.getByTestId("loading-state")
        ).toHaveTextContent("error");
        });
    });

    test("filters pokemon by search", async () => {
        vi.mocked(getGeneration).mockResolvedValue(
        mockPokemon as any
        );

        render(<PokemonLista />);

        await waitFor(() => {
        expect(
            screen.getByText("pikachu")
        ).toBeInTheDocument();
        });

        fireEvent.change(
        screen.getByTestId("search-bar"),
        {
            target: {
            value: "pika",
            },
        }
        );

        expect(
        screen.getByText("pikachu")
        ).toBeInTheDocument();

        expect(
        screen.queryByText("charizard")
        ).not.toBeInTheDocument();
    });

    test("filters pokemon by type", async () => {
        vi.mocked(getGeneration).mockResolvedValue(
        mockPokemon as any
        );

        render(<PokemonLista />);

        await waitFor(() => {
        expect(
            screen.getByText("pikachu")
        ).toBeInTheDocument();
        });

        fireEvent.click(
        screen.getByText("electric")
        );

        expect(
        screen.getByText("pikachu")
        ).toBeInTheDocument();

        expect(
        screen.queryByText("charizard")
        ).not.toBeInTheDocument();
    });

    test("clears filters", async () => {
        vi.mocked(getGeneration).mockResolvedValue(
        mockPokemon as any
        );

        render(<PokemonLista />);

        await waitFor(() => {
        expect(
            screen.getByText("pikachu")
        ).toBeInTheDocument();
        });

        fireEvent.click(
        screen.getByText("electric")
        );

        fireEvent.click(
        screen.getByText("clear-filters")
        );

        expect(
        screen.getByTestId("selected-types")
        ).toHaveTextContent("");
    });
});